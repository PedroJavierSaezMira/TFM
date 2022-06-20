import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/user.service';
import {  MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  
  constructor(private router:Router, public userService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //Función para el login
  login() {
    const user = {email: this.email, password: this.password};
    this.userService.login(user).subscribe( data => {
      console.log(data);
      this.userService.setToken(data.token);
      this.snackBar.open('¡ Usuario y contraseña correctos !', 'Cerrar', {duration: 3000 });
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.snackBar.open(' Usuario o contraseña incorrectos !', 'Cerrar', {duration: 3000 });
      console.log('error', error.message);
    });
  }
  
  

}
