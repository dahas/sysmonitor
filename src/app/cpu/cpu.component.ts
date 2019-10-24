import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { SystemInfoService } from './../services/system-info.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

// import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
// import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
@Component({
    selector: 'app-cpu',
    templateUrl: './cpu.component.html'
})
export class CpuComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('cpuChart', { static: false }) cpuChart: jqxChartComponent;

    private wsSubscription: Subscription;

    data: any[] = [];
    padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
    titlePadding: any = { left: 0, top: 0, right: 0, bottom: 10 };

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
                        dataField: 'value', displayText: 'value', opacity: 0.5, lineWidth: 1,
                        symbolType: 'circle', fillColorSymbolSelected: 'white', symbolSize: 1
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
            this.data.push({ timestamp: new Date(timestamp.valueOf()), value: 0 });
        }
        this.data = this.data.reverse();
    }

    ngAfterViewInit(): void {
        const data = this.cpuChart.source();

        this.wsSubscription = this.wsService.createObservableSocket()
            .subscribe(m => {
                if (data.length >= environment.charts.xRange) {
                    data.splice(0, 1);
                }
                const item: any = JSON.parse(m);
                item.time = new Date(item.time);
                data.push({ timestamp: item.time, value: item.cpu });
                this.cpuChart.update();
            });
    }

    ngOnDestroy(): void {
        this.wsSubscription.unsubscribe();
    }
}
