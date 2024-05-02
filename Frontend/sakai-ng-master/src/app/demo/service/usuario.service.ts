import { Injectable } from '@angular/core';
import { Usuario } from '../models/UsuarioViewModel';
import { UsuarioEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient) { }

  public endpoint = new UsuarioEndPoints();

  List(){
    return this.http.get<any>(this.endpoint.List()) 
      .toPromise() 
      .then(res => res.data as Usuario[])
      .then(data => data);
  }

  Login(usuario: string, contrasena: string){
    return this.http.get<any>(this.endpoint.Login(usuario, contrasena))
        .toPromise()
  }
}