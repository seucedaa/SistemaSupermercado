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

  
  Generarpdf(Sucur_Id: number) {
    const url = this.endpoint.Generarpdf(Sucur_Id);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  Generarpdf2() {
    const url = this.endpoint.Generarpdf2();
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  
}
