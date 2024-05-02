import { Injectable } from '@angular/core';
import { Impuesto } from '../models/ImpuestoViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Impuesto/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Impuesto[])
      .then(data => data);
  }
}
