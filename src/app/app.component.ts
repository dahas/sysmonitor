import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <jqxSplitter #mainSplitter [width]="'100%'" [height]="'100%'" [panels]="[{ size: '50%' }]">
          <app-mem></app-mem>
          <app-cpu></app-cpu>
      </jqxSplitter>
    `,
})
export class AppComponent {}
