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

  
  Stock(Sucur_Id: number) {
    const url = this.endpoint.Stock(Sucur_Id);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }
  Generarpdf(Sucur_Id: number, nombre:string) {
    const url = this.endpoint.Generarpdf(Sucur_Id,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  Generarpdf2(nombre:string) {
    const url = this.endpoint.Generarpdf2(nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  PDFProductos(Sucur_Id: number, inicio:string, fin:string, nombre:string) {
    const url = this.endpoint.PDFProductos(Sucur_Id,inicio,fin,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  PDFProductos2(inicio:string, fin:string, nombre:string) {
    const url = this.endpoint.PDFProductos2(inicio,fin,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  PDFVentas(Sucur_Id: number, inicio:string, fin:string, nombre:string) {
    const url = this.endpoint.PDFVentas(Sucur_Id,inicio,fin,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  PDFVentas2(inicio:string, fin:string, nombre:string) {
    const url = this.endpoint.PDFVentas2(inicio,fin,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  PDFClientes(inicio:string, fin:string, nombre:string) {
    const url = this.endpoint.PDFClientes(inicio,fin,nombre);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }
}
