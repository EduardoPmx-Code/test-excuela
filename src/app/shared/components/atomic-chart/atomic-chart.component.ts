import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { chartData, configChart, opntionsCharts } from 'src/utils/interfaces';


@Component({
  selector: 'app-atomic-chart',
  templateUrl: './atomic-chart.component.html',
  styleUrls: ['./atomic-chart.component.scss']
})
export class AtomicChartComponent implements AfterViewInit,OnChanges  {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef;
  @Input() ctx!:chartData
  @Input() config!:configChart
  @Input() opntionsCharts!:opntionsCharts
  private chartInstance: Chart | null = null;
  
  constructor() {
    /*this.ctx={
      labels:[ 'test','test','test'],
      datasets:[
        {
          label:"label",
          backgroundColor:'rgb(255, 99, 132)',
          borderColor:"rgb(255, 99, 132)",
          data:[1,5,9,4,3,7]
        }
      ],
    };
    this.config={
      type:'bar'
    }
    this.opntionsChats={
      scales:{
        y:{
          beginAtZero:true,
          display:true
        }
      }
    }*/
   }
   ngAfterViewInit(): void {
    this.createChart();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.createChart(); 
  }
 /* createChart(type:configChart= this.config, data:chartData=this.ctx,opntions:opntionsCharts=this.opntionsCharts){
    Chart.register(...registerables);
    let chartConfig: ChartConfiguration={
      type: type.type,
      data:data,
      options:opntions
    }
    const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem
   new Chart(chartItem, chartConfig)
  }*/
  
   
   createChart(): void {
    Chart.register(...registerables);

    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

      this.chartInstance = new Chart(ctx, {
        type: this.config.type,
        data: this.ctx,
        options: this.opntionsCharts
      });
    }
  }
}
