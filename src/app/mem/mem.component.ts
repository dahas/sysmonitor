import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SystemInfoService } from './../services/system-info.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';

@Component({
  selector: 'app-mem',
  templateUrl: './mem.component.html'
})
export class MemComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('memChart', { static: false }) memChart: jqxChartComponent;

  private wsSubscription: Subscription;

  private refreshMem = true;

  memData: any[] = [];
  padding: any = { left: 5, top: 5, right: 5, bottom: 15 };
  titlePadding: any = { left: 0, top: 5, right: 0, bottom: 10 };

  xAxis: any =
    {
      dataField: 'timestamp',
      type: 'date',
      baseUnit: 'second',
      unitInterval: 5,
      formatFunction: (value: any) => {
        return jqx.dataFormat.formatdate(value, 'hh:mm:ss', 'de-DE');
      },
      gridLines: { step: 1 },
      valuesOnTicks: true,
      labels: { angle: -0, offset: { x: -17, y: 0 } }
    };

  seriesGroups: any[] =
    [
      {
        type: 'area',
        columnsGapPercent: 10,
        alignEndPointsWithIntervals: true,
        valueAxis:
        {
          minValue: 0,
          maxValue: 16000,
          unitInterval: 2000,
          // title: { text: 'MegaByte' }
        },
        series: [
          {
            dataField: 'value', formatFunction: this.formatMem, displayText: 'Usage', opacity: 0.5, lineWidth: 1
          }
        ]
      }
    ];

  constructor(private wsService: SystemInfoService) { }

  ngOnInit() {
    this.generateChartData();
  }

  generateChartData = () => {
    const timestamp = new Date();
    for (let i = 0; i < environment.charts.xRange; i++) {
      timestamp.setMilliseconds(0);
      timestamp.setSeconds(timestamp.getSeconds() - 1);
      this.memData.push({ timestamp: new Date(timestamp.valueOf()), value: 0 });
    }
    this.memData = this.memData.reverse();
  }

  ngAfterViewInit(): void {
    this.wsSubscription = this.wsService.createObservableSocket()
      .subscribe(m => {
        if (this.memData.length >= environment.charts.xRange) {
          this.memData.splice(0, 1);
        }
        const item: any = JSON.parse(m);
        item.time = new Date(item.time);
        this.memData.push({ timestamp: item.time, value: item.memUsed });
        this.seriesGroups.map(s => s.valueAxis.maxValue = Math.round(item.memTotal / 1000) * 1000);
        if (this.refreshMem) {
          this.memChart.update();
        }
      });
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }

  formatMem(value) {
    return `Memory used: ${value} MB`;
  }

  pauseMemChartUpdate(ev): void {
    if (ev.target.nodeName === 'path') {
      this.refreshMem = false;
    } else {
      this.refreshMem = true;
    }
  }

  restartMemChartUpdate(): void {
    this.refreshMem = true;
  }
}
