import { Injectable } from '@angular/core';
import { Usuario } from '../models/UsuarioViewModel';
import { UsuarioEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient,private route:Router) { }

  public endpoint = new UsuarioEndPoints();
  pantallas: string[] = [];

  getList(){
    return this.http.get<Usuario[]>(this.endpoint.List()) 
      .toPromise()
      .then(data => data);
  }



  Login(usuario: string, contrasena: string): Observable<any> {
    return this.http.get<any>(this.endpoint.Login(usuario, contrasena));
  }
  // login(usuario: string, contrasena: string): Promise<any> {
  //   const url = this.endpoint.getLoginUrl(usuario, contrasena);
  //   return this.http.get<any>(url).toPromise();
  // }

  Recuperacion(usuario: string){
    return this.http.get<any>(this.endpoint.Recuperacion(usuario))
        .toPromise()
  }

  Reestablecer(codigo: string, contrasena: string) {
    return this.http.put<any>(
      this.endpoint.Reestablecer(codigo, contrasena), 
      null, 
    ).toPromise();
  }
  

  EstaLogueado(){
    return localStorage.getItem('usuario')!=null;
  }

  GetToken(){
    return localStorage.getItem('usuario') || '';
  }

  TieneAcceso(screen: string): boolean {
    var logintoken = localStorage.getItem('usuario') || '';
    if (!logintoken) {
      console.error('Token de usuario no encontrado');
      this.route.navigate(['']);
      return false;
    }
    var _extraertoken = logintoken.split('.')[1];
    
    try {
      var _atobdata = atob(_extraertoken);
      console.log(_atobdata);
      var _finaldata = JSON.parse(_atobdata);
  
      _finaldata.forEach(item => {
        this.pantallas.push(item.pant_Descripcion);
  
        if (item.pant_Descripcion != null) {
          this.pantallas.push(item.pant_Descripcion);
        } else {
          this.pantallas.push("Ninguna Pantalla");
        }
      });
      localStorage.setItem('pantallas', JSON.stringify(this.pantallas));
      console.log(this.pantallas);
      if (_finaldata.usuar_Admin) {
        return true; 
      }
  
      return this.pantallas.includes(screen); 
    } catch (e) {
      console.error('Error:', e);
      return false;
    }
  }
}
