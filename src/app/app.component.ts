import { Component } from '@angular/core';
import { SystemInfoService } from './services/system-info.service';

@Component({
  selector: 'app-root',
  template: `
      <kendo-splitter orientation="horizontal" style="height: 100%;">

            <kendo-splitter-pane size="50%" min="200px">
              <app-mem></app-mem>
            </kendo-splitter-pane>

            <kendo-splitter-pane min="200px">
              <app-cpu></app-cpu>
            </kendo-splitter-pane>

          </kendo-splitter>
    `,
})
export class AppComponent {

  constructor(private wsService: SystemInfoService) { }
}
