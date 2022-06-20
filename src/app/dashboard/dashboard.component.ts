import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {finalize} from 'rxjs/operators';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Variables
  columnas: string[] = ['a', 'b', 'c','d', 'e','f','g','h','i','j'];
  datos: Datos[]= [];
  datosfrase: DatosFrase[]= [];
  dataSource:any;
  dataSource2:any;
  parametro:any;
  parametro2:any;
  parametro3:any;
  parametro4:any;
  parametro5:any;
  parametro6:any;
  parametro7:any;
  valor1: any;
  valor2: any;
  numero!: number;
  operacion:any;
  frase: any;

  constructor(private http: HttpClient, private router:Router) { }
  
  
  @ViewChild(MatTable) tabla1!: MatTable<DashboardComponent>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 
  //Campos de la base de datos para pasar al formulario
  campos = [
    {valor:'Ingresos', muestraValor:'Tipo país según sus ingresos'},
    {valor:'Pais', muestraValor:'País'},
    {valor:'Numero_dosis_administradas', muestraValor:'Número dosis administradas (en millones)'},
    {valor:'Numero_dosis_refuerzo_administradas', muestraValor:'Número dosis refuerzo administradas (en millones)'},
    {valor:'Porcentaje_poblacion_totalmente_vacunada', muestraValor:'% población totalmente vacunada'},
    {valor:'Porcentaje_poblacion_una_dosis', muestraValor:'% población que ha recibido al menos una dosis'},
    {valor:'Dosis_refuerzo_administradas_por_poblacion', muestraValor:'Dosis de refuerzo administradas por % de población'},
    {valor:'Dosis_administradas_por_desarrolladas', muestraValor:'Dosis administradas por % de dosis desarrolladas'},
    {valor:'Maximo_ratio_diario_vacunacion_observado', muestraValor:'Máximo ratio diario de vacunación observado (por cada 100 personas)'},
    {valor:'Ratio_vacunacion_diaria_inmunidad', muestraValor:'Ratio vacunación diaria necesario para alcanzar el 70% de población (por cada 100 personas)'},
    
  ];
  campo_seleccionado: string = this.campos[0].valor;

  campos2 = [
    {valor:'Ingresos, Pais', muestraValor:'Tipo país según sus ingresos'},
    {valor:'Pais, Numero_dosis_administradas, Porcentaje_poblacion_totalmente_vacunada, Dosis_administradas_por_desarrolladas', muestraValor:'Vacunación completa'},
    {valor:'Pais, Porcentaje_poblacion_una_dosis', muestraValor:'Vacunación 1 dosis'},
    {valor:'Pais, Numero_dosis_refuerzo_administradas, Dosis_refuerzo_administradas_por_poblacion', muestraValor:'Vacunación dosis refuerzo'},
    {valor:'Pais, Maximo_ratio_diario_vacunacion_observado, Ratio_vacunacion_diaria_inmunidad', muestraValor:'Ratios'},

  ];
  campo_seleccionado2: string = this.campos2[0].valor;
  
  //Operaciones para pasar al formulario 
  operaciones = [
    {valor:'=', muestraValor:'='},
    {valor:'>', muestraValor:'>'},
    {valor:'<', muestraValor:'<'},
    
  ];
  operacion_seleccionada: string = this.operaciones[0].valor;


//Funciones recoger datos
  recogerdatos(){
    return this.http.get("http://localhost:3000/read")
   }

   recogerdatos2(){
     return this.http.get("http://localhost:3000/read2")
   }

   recogerdatos3(){
    return this.http.get("http://localhost:3000/read3")
  }


  
  //Función  para recoger los parámetros del formulario "Buscar en la base de datos" y enviarlo al servidor
   formularioEnviado(){
  
      console.log("El formulario fue enviado")
   
      this.parametro3=this.numero;
      console.log("El parametro es: " +this.campo_seleccionado);

      this.http.get("http://localhost:3000/recogerparametro", {params: {parametro1:this.campo_seleccionado, parametro2: this.operacion_seleccionada, parametro3:this.parametro3}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      //Enviar parámetros a la vista para que los muestre
      this.recogerdatos2().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    })
    }

  

    //Función  para recoger los parámetros del formulario "Buscar por columna" y enviarlo al servidor
    formularioEnviado2(){

      console.log("El formulario fue enviado")
      console.log("El parametro es: " +this.campo_seleccionado2);

    
      this.http.get("http://localhost:3000/recogerparametro2", {params: {parametro1:this.campo_seleccionado2}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);

      //Enviar parámetros a la vista para que los muestre
      this.recogerdatos3().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    }) 
    }


      //Función  para recoger los parámetros del formulario "Buscar por frase" y enviarlo al servidor
    formulariofrase(){
     
      console.log("El formulario fue enviado")
    

     //Quiero que me muestres los países cuyo número de dosis de refuerzo administradas es mayor de 5 millones
    
    if(this.frase.includes("refuerzo") & this.frase.includes("mayor") & this.frase.includes("5")){
              this.parametro5="Numero_dosis_refuerzo_administradas"
              this.parametro6=">"
              this.parametro7="5"
      
     //Quiero que me muestres los países cuyo porcentaje de población vacunada sea menor al 40%
      
     }if(this.frase.includes("porcentaje") & this.frase.includes("menor") & this.frase.includes("40")){
              this.parametro5="Porcentaje_poblacion_totalmente_vacunada"
              this.parametro6="<"
              this.parametro7="40"
      }
      
    
      //Recoger parámetros
      this.http.get("http://localhost:3000/recogerparametrofrase", {params: {parametro1:this.parametro5, parametro2: this.parametro6, parametro3:this.parametro7}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      //Enviar parámetros a la vista para que los muestre
      this.recogerdatos2().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<DatosFrase>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    }) 
    }


    //Función para el apartado "Buscar en la tabla"
    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }  

  //Funciones para descargar el archivo

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}.xlsx`;
  }
  
  exportarArchivo() {
    this.parametro2=this.valor2;
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource2);
  const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
  XLSX.writeFile(workbook, DashboardComponent.toExportFileName(this.parametro2));
  
  }

   descargarArchivo() {
      this.recogerdatos2()
      .pipe(finalize( () => this.exportarArchivo()))
      .subscribe(
        resultado=> {
          this.dataSource2= resultado
         } ) 
    }

   


    //Primer método que inicia Angular al arrancar la aplicación
  ngOnInit() {

    //Método que recoge los datos y se los pasa a la vista
    this.recogerdatos().subscribe(
      resultado=> {
        this.dataSource= resultado;
        this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
      
  }
    
  }

  //Exportación datos
  export class Datos {
    constructor(public a: any, public b: any, public c: any) {
    }
  }

  export class DatosFrase {
    constructor(public a: any, public b: any, public c: any) {
    }
  }

