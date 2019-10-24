import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { CpuComponent } from './cpu/cpu.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SystemInfoService } from './services/system-info.service';
import { MemComponent } from './mem/mem.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';

import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { jqxSplitterModule } from 'jqwidgets-ng/jqxsplitter';

@NgModule({
  declarations: [
    AppComponent,
    CpuComponent,
    MemComponent,
    jqxChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    jqxSplitterModule,
    ChartsModule,
    LayoutModule,
    ToolBarModule
  ],
  providers: [SystemInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
