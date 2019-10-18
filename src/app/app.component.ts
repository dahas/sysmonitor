import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <kendo-splitter orientation="horizontal" style="height: 100%;">

            <kendo-splitter-pane [collapsible]="true" size="20%" min="200px">
              <div class="pane-content">
                <h3>Inner splitter / left pane</h3>
                <p>Resizable and collapsible.</p>
              </div>
            </kendo-splitter-pane>

            <kendo-splitter-pane>
              <div class="pane-content">
                <app-cpu></app-cpu>
              </div>
            </kendo-splitter-pane>

          </kendo-splitter>
    `,
  styles: [ `
      .pane-content { padding: 0 10px; }
      h3 { font-size: 1.2em; margin: 10px 0; padding: 0; }
      p { margin: 0; padding: 0; }
  ` ]
})
export class AppComponent {
}
