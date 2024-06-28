import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    SharedModule
  ]
})
export class ChartsModule { }
