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

   }
   // Este método se ejecuta después de que la vista del componente ha sido inicializada.
   ngAfterViewInit(): void {
    this.createChart();
  }

  // Este método se ejecuta cuando cambian los valores de las propiedades de entrada.
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.chartInstance) {
      console.log(this.chartInstance);
      this.chartInstance.destroy(); // Destruir la instancia existente del gráfico para crear uno nuevo.
    }
    this.createChart();
  }

  // Este método crea y configura el gráfico utilizando Chart.js.
  createChart(): void {
    Chart.register(...registerables); // Registrar los componentes de Chart.js.

    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

      this.chartInstance = new Chart(ctx, {
        type: this.config.type, // Tipo de gráfico.
        data: this.ctx, // Datos del gráfico.
        options: this.opntionsCharts // Opciones de configuración del gráfico.
      });
    }
  }
}
