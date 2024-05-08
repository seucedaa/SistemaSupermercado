import { Injectable } from '@angular/core';
import { Producto } from '../models/ProductoViewModel';
import { HttpClient } from '@angular/common/http';
import { ReporteEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient) { }
  public endpoint = new ReporteEndPoints();

  Stock(Sucur_Id: number){
    return this.http.get<any>(this.endpoint.Stock(Sucur_Id)) 
    .toPromise()  
    .then(res => res.data as Producto[])
    .then(data => data);
  }
}