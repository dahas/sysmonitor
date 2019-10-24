import { Component } from '@angular/core';

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

  constructor() { }
}
