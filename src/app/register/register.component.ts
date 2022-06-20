import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "../users/user.service";
import {  MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: any;
  password: any;
  confirmPassword: any;
  passwordError: any;

  constructor(private router:Router,public userService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  } 

  //Función para el registro
  register() {
    const user = { email: this.email, password: this.password, confirmPassword: this.confirmPassword };
    if (this.password !== this.confirmPassword){
      this.snackBar.open('! La contraseña no coincide !', 'Cerrar', {duration: 3000 });
    }else {
    this.userService.register(user).subscribe(data => {
      console.log(data);
      this.userService.setToken(data.token);
      this.snackBar.open('! Usuario creado correctamente !', 'Cerrar', {duration: 3000 });
      this.router.navigateByUrl('/login');
  },error => {
    console.log(error);
  });
    }
}

 

}
