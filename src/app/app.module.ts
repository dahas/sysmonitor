import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { CpuComponent } from './cpu/cpu.component';
import { SystemInfoService } from './services/system-info.service';
import { MemComponent } from './mem/mem.component';

import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { jqxSplitterModule } from 'jqwidgets-ng/jqxsplitter';

@NgModule({
  declarations: [
    AppComponent,
    CpuComponent,
    MemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    jqxChartModule,
    jqxSplitterModule
  ],
  providers: [SystemInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
