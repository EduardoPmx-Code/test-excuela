import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartItem, ChartTypeRegistry, registerables} from 'node_modules/chart.js'
import { chartData, configChart, opntionsCharts } from 'src/utils/interfaces';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
  
})

export class ChartsComponent implements OnInit {
  chartDataProp: chartData; // Propiedad para los datos del gráfico.
  chartConfigProp: configChart; // Propiedad para la configuración del gráfico.
  chartOptionsProp: opntionsCharts; // Propiedad para las opciones del gráfico.

  constructor() {
    // Inicialización de los datos del gráfico.
    this.chartDataProp = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Expenses',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'Profit',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: [35, 25, 45, 55, 65, 75, 85]
        }
      ]
    };

    // Inicialización de la configuración del gráfico.
    this.chartConfigProp = {
      type: 'bar' // Tipo de gráfico.
    };

    // Inicialización de las opciones del gráfico.
    this.chartOptionsProp = {
      scales: {
        y: {
          beginAtZero: false,
          display: false
        }
      }
    };
  }

  // Método para aplicar filtros a los datos del gráfico.
  applyFilters(filterType: string): void {
    switch (filterType) {
      case 'lastSixMonths':
        // Datos para los últimos seis meses.
        this.chartDataProp = {
          labels: ['February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              data: [15, 80, 81, 100, 55, 40]
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: [48, 1, 19, 15, 27, 0]
            },
            {
              label: 'Profit',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: [25, 45, 55, 65, 75, 85]
            }
          ]
        };
        break;

      case 'currentYear':
        // Datos para el año en curso.
        this.chartDataProp = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
              label: 'Profit',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: [35, 25, 45, 55, 65, 75, 85]
            }
          ]
        };
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
  }

  // Método para cambiar el tipo de gráfico.
  changeChartType(newType: configChart['type']) {
    this.chartConfigProp = { ...this.chartConfigProp, type: newType };
    console.log(this.chartConfigProp.type); // Log para verificar el nuevo tipo de gráfico.
  }
}

