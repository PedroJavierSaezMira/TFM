import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-graficalinea',
  templateUrl: './graficalinea.component.html',
  styleUrls: ['./graficalinea.component.css']
})
export class GraficalineaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

   //Datos de la gráfica
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 5.87, 2.77, 13.71, 17.54, 0.13, 96.96, 2.11, 0.17, 56.48, 18.16 ],
        label: 'Número dosis administradas',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 0, 0.27, 0.49, 0.31, 0, 19.33, 0.03, 0, 12.97, 5.1 ],
        label: 'Número dosis refuerzo',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria' ]
  };

  //Opciones de la gráfica
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      
    },

    plugins: {
      legend: { display: true },
     
    }
  };


  //Tipo de gráfica
  public lineChartType: ChartType = 'line';


  //Función para cambiar el color de la gráfica
  public changeColor(): void {
    this.lineChartData.datasets[1].borderColor = 'green';
    this.lineChartData.datasets[1].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }


}
