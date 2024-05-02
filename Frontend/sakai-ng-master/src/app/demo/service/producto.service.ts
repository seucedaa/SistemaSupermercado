import { Injectable } from '@angular/core';
import { Producto } from '../models/ProductoViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Producto/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Producto[])
      .then(data => data);
  }
}
