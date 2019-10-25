import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { SystemInfoService } from './../services/system-info.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';

@Component({
    selector: 'app-cpu',
    templateUrl: './cpu.component.html'
})
export class CpuComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('cpuChart', { static: false }) cpuChart: jqxChartComponent;

    private wsSubscription: Subscription;

    private refreshCpu = true;

    cpuData: any[] = [];
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
                    maxValue: 100,
                    unitInterval: 20,
                    title: { text: 'Percentage' }
                },
                series: [
                    {
                        dataField: 'value', formatFunction: this.formatCpu, displayText: 'Usage', opacity: 0.5, lineWidth: 1
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
            this.cpuData.push({ timestamp: new Date(timestamp.valueOf()), value: 0 });
        }
        this.cpuData = this.cpuData.reverse();
    }

    ngAfterViewInit(): void {
        this.wsSubscription = this.wsService.createObservableSocket()
            .subscribe(m => {
                if (this.cpuData.length >= environment.charts.xRange) {
                    this.cpuData.splice(0, 1);
                }
                const item: any = JSON.parse(m);
                item.time = new Date(item.time);
                this.cpuData.push({ timestamp: item.time, value: item.cpu });
                if (this.refreshCpu) {
                  this.cpuChart.update();
                }
            });
    }

    ngOnDestroy(): void {
        this.wsSubscription.unsubscribe();
    }

    formatCpu(value) {
      return `CPU usage: ${value} %`;
    }

    toggleRefreshingCpu(): void {
      this.refreshCpu = !this.refreshCpu;
    }
}
