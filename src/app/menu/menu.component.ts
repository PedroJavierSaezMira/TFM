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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  columnas: string[] = ['a', 'b', 'c','d', 'e','f','g','h','i','j'];
  columnasreglas: string[] = ['aa', 'bb','cc','dd'];
  datos: Datos[]= [];
  datosreglas: Datosreglas[]= [];
  dataSource:any;
  dataSource2:any;
  dataSourcereglas:any;
  parametro:any;
  parametro2:any;
  parametro3:any;
  parametro4:any;
  parametro5:any;
  parametro6:any;
  parametro7:any;
  parametro8:any;
  parametro9:any;
  parametro10:any;
  valor1: any;
  valor2: any;
  numero!: number;
  operacion:any;
  
  actividad = new FormControl();

  lista!: string[];
  frase: any;

  constructor(private http: HttpClient, private router:Router) { }
  
  
  @ViewChild(MatTable) tabla1!: MatTable<MenuComponent>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

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
  
  operaciones = [
    {valor:'=', muestraValor:'='},
    {valor:'>', muestraValor:'>'},
    {valor:'<', muestraValor:'<'},
    
  ];
  operacion_seleccionada: string = this.operaciones[0].valor;



  recogerdatos(){
    return this.http.get("http://localhost:3000/read")
   }

   recogerdatosreglas(){
    return this.http.get("http://localhost:3000/readreglas")
   }

   recogerdatosparametroreglas(){
    return this.http.get("http://localhost:3000/readparametroreglas")
   }

   recogerdatos2(){
     return this.http.get("http://localhost:3000/read2")
   }

   recogerdatos3(){
    return this.http.get("http://localhost:3000/read3")
  }
  
   pasaraDashboard(){
    this.router.navigateByUrl('/dashboard');
   }

   pasaraGraficas(){
    this.router.navigateByUrl('/login');
   }

  

   formularioEnviado(){
  
      
      
      console.log("El formulario fue enviado")
      var tam=10; 
      console.log(this.numero);
     /*  for (var i=1;i<tam;i++){
      
      this.parametro3=this.numero+i;
      } */

      this.parametro3=this.numero;
      console.log("El parametro es: " +this.campo_seleccionado);

      this.http.get("http://localhost:3000/recogerparametro", {params: {parametro1:this.campo_seleccionado, parametro2: this.operacion_seleccionada, parametro3:this.parametro3}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      this.recogerdatos2().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    })
    }

    formularioEnviado2(){
  
      
      
      console.log("El formulario fue enviado")
      /* var tam=10; 
      console.log(this.numero);
      for (var i=1;i<tam;i++){
      
      this.parametro3=this.numero+i;
      } */
      console.log("El parametro es: " +this.campo_seleccionado2);

      this.http.get("http://localhost:3000/recogerparametro2", {params: {parametro1:this.campo_seleccionado2}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      this.recogerdatos3().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    }) 
    }

    formulariofrase(){
     


      console.log("El formulario fue enviado")
      /* var tam=10; 
      console.log(this.numero);
      for (var i=1;i<tam;i++){
      
      this.parametro3=this.numero+i;
      }  */

      //Quiero que me muestres las reglas de calidad con fecha igual al 19 de mayo de 2021
      //Quiero que me muestres las reglas de calidad con fecha igual al 1 de enero de 2000
      if(this.frase.includes("fecha") & this.frase.includes("igual") & this.frase.includes("19 de mayo de 2021")){
        this.parametro5="gf_cutoff_date"
        this.parametro6="="
        this.parametro7="19/05/2021"
        console.log("Estoy aqui")

      }if(this.frase.includes("fecha") & this.frase.includes("igual") & this.frase.includes("1 de enero de 2000")){
        this.parametro5="gf_cutoff_date"
        this.parametro6="="
        this.parametro7="01/01/2000"
      }

      /* else{
        
      this.recogerdatos().subscribe(
      resultado=> {
        this.dataSource= resultado;
        this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      
      }
    }
     */
    

      this.http.get("http://localhost:3000/recogerparametro", {params: {parametro1:this.parametro5, parametro2: this.parametro6, parametro3:this.parametro7}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      this.recogerdatos2().subscribe(
        resultado=> {
          this.dataSource= resultado;
          this.dataSource = new MatTableDataSource<Datosreglas>(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
    }) 
    }

    formulariofrasereglas(){
     


      console.log("El formulario fue enviado")
      //"Quiero visualizar todas las reglas de finanzas que se aplican sobre el campo saldo disponible"
      if(this.frase.includes("saldo")){
        this.parametro8="logical_name_field"
        this.parametro9="="
        this.parametro10="BALANCE"
        

      }if(this.frase.includes("amortizacion")){
        this.parametro8="logical_name_field"
        this.parametro9="="
        this.parametro10="AMORTIZATION"
     

      }

      this.http.get("http://localhost:3000/recogerparametroreglas", {params: {parametro1:this.parametro8, parametro2: this.parametro9, parametro3:this.parametro10}})
      .toPromise().then(response => {
        console.log(response);
      })
      .catch(console.log);
      
      this.recogerdatosparametroreglas().subscribe(
        resultado2=> {
          this.dataSourcereglas= resultado2;
          this.dataSourcereglas = new MatTableDataSource<Datosreglas>(this.dataSourcereglas);
          this.dataSourcereglas.sort = this.sort;
          this.dataSourcereglas.paginator = this.paginator;
      
        
        }
      );
    }

  
   descargarCSV() {
      this.recogerdatos2()
      .pipe(finalize( () => this.exportarCSV()))
      .subscribe(
        resultado=> {
          this.dataSource2= resultado
         
         } )
      
    }

    exportarCSV() {
      this.parametro2=this.valor2;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource2);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, MenuComponent.toExportFileName(this.parametro2));
    
    }

    static toExportFileName(excelFileName: string): string {
      return `${excelFileName}.xlsx`;
    }
    
/* 
  agregar() {
    this.lista.push(this.actividad.value);    
    console.log(this.actividad.value);
    localStorage.setItem('actividades', JSON.stringify(this.lista));
    this.actividad.setValue('');
  }

  borrar(pos:number) {
    this.lista.splice(pos,1);
    localStorage.clear();
    localStorage.setItem('actividades', JSON.stringify(this.lista));
  }

  borrarTodas() {
    localStorage.clear();
    this.lista=[];
  }
   
 */

  navegarHaciaVista2(){
    this.router.navigate(['/vista2']);

  }

  ngOnInit() {

  
    this.recogerdatos().subscribe(
      resultado=> {
        this.dataSource= resultado;
        this.dataSource = new MatTableDataSource<Datos>(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
      
      }
    )
      
    this.recogerdatosreglas().subscribe(
      resultado2=> {
        this.dataSourcereglas= resultado2;
        this.dataSourcereglas = new MatTableDataSource<Datosreglas>(this.dataSourcereglas);
        this.dataSourcereglas.sort = this.sort;
        this.dataSourcereglas.paginator = this.paginator;
    
      
      }
    );


  }
    
   /*  this.recogerdatos2().subscribe(
      resultado=> {
        this.dataSource2= resultado;
        this.dataSource2 = new MatTableDataSource<Datos>(this.dataSource2);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      }
    ); */
    

   
    

    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }  

    

 /*  sumar() {
    this.resultado = this.valor1 + this.valor2;
  }
   */
  }

  
  
  
  export class Datos {
    constructor(public a: any, public b: any, public c: any) {
    }
  }

  export class Datosreglas {
    constructor(public a: any, public b: any, public c: any) {
    }
  }

  export class Parametro{
    parametrof:any
    constructor() {
      
      this.parametrof;
  }
}
