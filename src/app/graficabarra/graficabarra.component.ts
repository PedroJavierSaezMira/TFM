import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import pluginDataLabels from 'chartjs-plugin-annotation';



@Component({
  selector: 'app-graficabarra',
  templateUrl: './graficabarra.component.html',
  styleUrls: ['./graficabarra.component.css']
})
export class GraficabarraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  //Opciones de la gráfica
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
     
    }
  };

  //Tipo de gráfica
  public barChartType: ChartType = 'bar';

  //Plugins de la gráfica
  public barChartPlugins = [pluginDataLabels];

  //Datos de la gráfica
  public barChartData: ChartData<'bar'> = {
    labels: [ 'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria'],
    datasets: [
      { data: [ 5.87, 2.77, 13.71, 17.54, 0.13, 96.96, 2.11, 0.17, 56.48, 18.16 ], label: 'Número dosis administradas' },
      { data: [ 0, 0.27, 0.49, 0.31, 0, 19.33, 0.03, 0, 12.97, 5.1 ], label: 'Número dosis refuerzo' },
    ]
  }; 

}
