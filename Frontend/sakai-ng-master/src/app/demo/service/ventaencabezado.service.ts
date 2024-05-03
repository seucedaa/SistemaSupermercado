import { Injectable } from '@angular/core';
import { VentaEncabezado } from '../models/VentasEncabezadoViewModel';
import { VentaEncabezadoEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaEncabezadoService {
  constructor(private http:HttpClient) { }

  public endpoint = new VentaEncabezadoEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as VentaEncabezado[])
    .then(data => data);
  }

  getTotal(){
    return this.http.get<any>(this.endpoint.Total()) 
    .toPromise()  
    .then(res => res.data as VentaEncabezado[])
    .then(data => data);
  }

}
