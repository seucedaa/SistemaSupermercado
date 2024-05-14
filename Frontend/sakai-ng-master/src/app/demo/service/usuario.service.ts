import { Injectable } from '@angular/core';
import { Usuario } from '../models/UsuarioViewModel';
import { UsuarioEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient,private route:Router) { }

  public endpoint = new UsuarioEndPoints();
  pantallas:any;

  getList(){
    return this.http.get<Usuario[]>(this.endpoint.List()) 
      .toPromise()
      .then(data => data);
  }

  Login(usuario: string, contrasena: string){
    return this.http.get<any>(this.endpoint.Login(usuario, contrasena))
        .toPromise()
  }

  EstaLogueado(){
    return localStorage.getItem('usuario')!=null;
  }

  GetToken(){
    return localStorage.getItem('usuario') || '';
  }

  TieneAcceso() {
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
          this.pantallas.add(item.pant_Descripcion);
          if(item.pant_Descripcion != null)
            {
              
            }
            else{
              
            }
        });

        if (_finaldata.usuar_Admin) {
            return true;
        }
        console.log(_finaldata);
        return false;
    } catch (e) {
        console.error('Error decodificando el token de usuario:', e);
        return false;
    }
  }

}
