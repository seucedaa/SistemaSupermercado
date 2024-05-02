import { Injectable } from '@angular/core';
import { Proveedor } from '../models/ProveedorViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Proveedor[])
      .then(data => data);
  }
}