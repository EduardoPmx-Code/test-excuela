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
  chartDataProp2: chartData;
  chartConfigProp2: configChart;
  chartOptionsProp2: opntionsCharts;
  // last chart
  chartDataProp3: chartData;
  chartConfigProp3: configChart;
  chartOptionsProp3: opntionsCharts;
  constructor() {
    this.chartDataProp = {
      labels: ['test', 'test', 'test'],
      datasets: [
        {
          label: "label",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: "rgb(255, 99, 132)",
          data: [1, 5, 9, 4, 3, 7]
        }
      ],
    };
    this.chartConfigProp = {
      type: 'bar'
    };
    this.chartOptionsProp = {
      scales: {
        y: {
          beginAtZero: true,
          display: true
        }
      }
    };
    // second chart
    this.chartDataProp2 = {
      labels: ['test', 'test', 'test'],
      datasets: [
        {
          label: "label",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: "rgb(255, 99, 132)",
          data: [1, 5, 9, 4, 3, 7]
        }
      ],
    };
    this.chartConfigProp2 = {
      type: 'doughnut'
    };
    this.chartOptionsProp2 = {
      scales: {
        y: {
          beginAtZero: true,
          display: true
        }
      }
    };
    // last chart
    this.chartDataProp3 = {
      labels: ['test', 'test', 'test'],
      datasets: [
        {
          label: "label",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: "rgb(255, 99, 132)",
          data: [1, 5, 9, 4, 3, 7]
        }
      ],
    };
    this.chartConfigProp3 = {
      type: 'line'
    };
    this.chartOptionsProp3 = {
      scales: {
        y: {
          beginAtZero: true,
          display: true
        }
      }
    };
   }
  ngOnInit(): void {
    
  }
}

