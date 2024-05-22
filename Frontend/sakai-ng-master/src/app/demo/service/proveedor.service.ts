import { Injectable } from '@angular/core';
import { Proveedor } from '../models/ProveedorViewModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/List';
  Url1 = `http://www.proyectosupermercado.somee.com/Insertar`;
  Url3 = 'http://www.proyectosupermercado.somee.com/Actualizar';


  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Proveedor[])
      .then(data => data);
  }

  Insert(model: Proveedor){
    return this.http.post<any>(this.Url1, model) 
      .toPromise()  
  }

  Update(model: Proveedor){
    return this.http.put<any>(this.Url3, model) 
      .toPromise()  
  }

  Details(id: number){
    return this.http.get<any>(`http://www.proyectosupermercado.somee.com/Detalle/${id}`) 
      .toPromise()  
  }

  Delete(id: number){
    return this.http.delete<any>(`http://www.proyectosupermercado.somee.com/Eliminar/${id}`) 
      .toPromise()  
  }
}
