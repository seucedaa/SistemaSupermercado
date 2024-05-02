import { Injectable } from '@angular/core';
import { Usuario } from '../models/UsuarioViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Usuario/List';

  getList(){
    return this.http.get<Usuario[]>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(data => data);
  }
}
