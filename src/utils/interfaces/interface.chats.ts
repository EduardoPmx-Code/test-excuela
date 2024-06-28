import { ChartConfiguration } from "chart.js";

export interface chartData{
    labels:string[];
    datasets:datasets[]
  }
  export interface datasets{
    label:string;
    backgroundColor:string;
    borderColor:string
    data:number[]
  }
  export interface opntionsCharts{
    scales: {
        y: {
          beginAtZero: boolean,
          display: boolean
        }
      }
  }
export interface configChart{
    type: 'doughnut' | 'bar' |'bubble'| 'pie' |'line';
}
