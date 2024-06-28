import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicChartComponent } from './components/atomic-chart/atomic-chart.component';



@NgModule({
  declarations: [AtomicChartComponent],
  imports: [
    CommonModule
  ],
  exports:[
    AtomicChartComponent
  ]
})
export class SharedModule { }
