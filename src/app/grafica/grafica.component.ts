import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import pluginDataLabels from 'chartjs-plugin-annotation';



@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent  {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

   //Opciones de la gráfica
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      
    }
  };

  //Datos de la gráfica
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ '% población totalmente vacunada', '% población no vacunada'],
    datasets: [ {
      data: [ 86.09, 13.91 ]
    } ]
  };

  //Tipo de gráfica
  public pieChartType: ChartType = 'pie';

  //Plugins de la gráfica
  public pieChartPlugins = [ pluginDataLabels ];

  //Función para cambiar la leyenda de posición
  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  




}