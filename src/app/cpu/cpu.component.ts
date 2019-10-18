import { Component } from '@angular/core';
import { SystemInfoService } from './../services/system-info.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html'
})
export class CpuComponent {

  public valueAxes: any[] = [{
    title: 'Percentage',
    min: 0,
    max: 100
  }];

  public series = [];
  public min: Date = new Date();
  public max: Date = new Date(this.min.getTime() + 60000);
  private url = 'ws://localhost:8088';

  constructor(private wsService: SystemInfoService) {
    wsService.createObservableSocket(this.url)
      .subscribe(m => {
        const item: any = JSON.parse(m);
        item.time = new Date(item.time);
        if (item.cpu) {
          this.series = [...this.series, item];
          if (this.series.length > 60) {
            this.min = this.series[this.series.length - 60].time;
            this.max = item.time;
          }
        }
      });
  }

}
