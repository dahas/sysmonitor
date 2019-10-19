import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from './../services/system-info.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mem',
  templateUrl: './mem.component.html'
})
export class MemComponent implements OnInit, OnDestroy {

  public valueAxes: any[] = [{
    title: 'MB',
    min: 0,
    max: 100
  }];

  public series = [];
  public min: Date;
  public max: Date;

  private wsSubscription: Subscription;

  constructor(private wsService: SystemInfoService) {
    this.min = new Date();
    this.max = new Date(this.min.getTime() + (environment.charts.xRange * 1000));
  }

  ngOnInit(): void {
    this.wsSubscription = this.wsService.createObservableSocket()
      .subscribe(m => {
        const item: any = JSON.parse(m);
        item.time = new Date(item.time);
        if (item.memUsed) {
          this.series = [...this.series, item];
          if (this.series.length >= environment.charts.xRange) {
            this.min = this.series[this.series.length - environment.charts.xRange].time;
            this.max = item.time;
          }
        }
      });
  }
  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }
}