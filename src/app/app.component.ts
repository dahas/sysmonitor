import { Component } from '@angular/core';
import { SystemInfoService } from './services/system-info.service';

@Component({
  selector: 'app-root',
  template: `
      <kendo-toolbar>
        <kendo-toolbar-button (click)="start();" [text]="'Start'"></kendo-toolbar-button>
        <kendo-toolbar-button (click)="stop();" [text]="'Stop'"></kendo-toolbar-button>
      </kendo-toolbar>
      <kendo-splitter orientation="horizontal" style="height: 400px;">

            <kendo-splitter-pane size="50%" min="200px">
              <app-mem></app-mem>
            </kendo-splitter-pane>

            <kendo-splitter-pane>
              <app-cpu></app-cpu>
            </kendo-splitter-pane>

          </kendo-splitter>
    `,
})
export class AppComponent {

  constructor(private wsService: SystemInfoService) {
    // window.addEventListener('beforeunload', event => {
    //   this.wsService.close();
    //   console.log(this.wsService);
    //   event.preventDefault();
    //   event.returnValue = 'Unsaved modifications';
    //   return event;
    // });
  }

  public start() {
    this.wsService.sendMessage('start');
  }

  public stop() {
    this.wsService.sendMessage('stop');
  }
}
