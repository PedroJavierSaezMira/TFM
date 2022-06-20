import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})

export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  //Función para el login
  login(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }

  //Función para el registro
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }

  //Función para guardar el token en una cookie
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  

}