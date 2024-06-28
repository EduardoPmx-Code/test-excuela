import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartItem, ChartTypeRegistry, registerables} from 'node_modules/chart.js'
import { chartData, configChart, opntionsCharts } from 'src/utils/interfaces';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
  
})

export class ChartsComponent implements OnInit {
  chartDataProp: chartData;
  chartConfigProp: configChart;
  chartOptionsProp: opntionsCharts;
  // second chart
  chartConfigProp2: configChart;
  // last chart
  chartConfigProp3: configChart;
  constructor() {
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
    this.chartConfigProp = {
      type: 'bar'
    };
    this.chartOptionsProp = {
      scales: {
        y: {
          beginAtZero: false,
          display: false
        }
      }
    };
    // second chart
   
    this.chartConfigProp2 = {
      type: 'doughnut'
    };
    // last chart
   
    this.chartConfigProp3 = {
      type: 'line'
    };
    
   }
   applyFilters(filterType: string): void {
    switch (filterType) {
      case 'lastSixMonths':
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
              data: [48,1, 19, 15, 27, 0]
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
}

