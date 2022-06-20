import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from "./register/register.component";
import { MenuComponent } from './menu/menu.component';
import { GraficaComponent } from './grafica/grafica.component';
import { GraficabarraComponent } from './graficabarra/graficabarra.component';
import { GraficalineaComponent } from './graficalinea/graficalinea.component';

//Definición de las distintas rutas de la aplicación y su componente asociado
const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent},
  { path: "menu", component: MenuComponent, pathMatch: "full" },
  { path: "grafica", component: GraficaComponent, pathMatch: "full" },
  { path: "graficabarra", component: GraficabarraComponent, pathMatch: "full" },
  { path: "graficalinea", component: GraficalineaComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
