import { Injectable } from '@angular/core';
import { Producto } from '../models/ProductoViewModel';
import { HttpClient } from '@angular/common/http';
import { ProductoEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  public endpoint = new ProductoEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Producto[])
    .then(data => data);
  }

  Existencia(sucursal: number){
    return this.http.get<any>(this.endpoint.Existencia(sucursal))
        .toPromise()
  }
  ExisTodas(){
    return this.http.get<any>(this.endpoint.ExisTodas())
        .toPromise()
  }

  Top(sucursal: number){
    return this.http.get<any>(this.endpoint.Top(sucursal))
        .toPromise()
        
  }
  Ventas(sucursal: number, inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.Ventas(sucursal, inicio,fin))
        .toPromise()
  }

  Todas(inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.Todas(inicio,fin))
        .toPromise()
  }
  
  Principal(sucursal: number){
    return this.http.get<any>(this.endpoint.Principal(sucursal))
        .toPromise()
  }

  Insert(model: Producto){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Producto){
    return this.http.put<any>(this.endpoint.Update(), model) 
      .toPromise()  
  }

  Details(id: number){
    return this.http.get<any>(this.endpoint.Details(id.toString())) 
      .toPromise()  
  }

  Delete(id: number){
    return this.http.delete<any>(this.endpoint.Delete(id.toString())) 
      .toPromise()  
  }
}
