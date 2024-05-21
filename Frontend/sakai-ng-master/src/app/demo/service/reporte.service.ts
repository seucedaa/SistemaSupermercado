import { Injectable } from '@angular/core';
import { Producto } from '../models/ProductoViewModel';
import { HttpClient } from '@angular/common/http';
import { ReporteEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }
  public endpoint = new ReporteEndPoints();


  getStock(Sucur_Id: number) {
    return this.http.get<any>(this.endpoint.Stock(Sucur_Id))
        .toPromise()
        .then(response => response)
        .catch(error => {
            console.error('Error en getStock:', error);
            throw error;
        });
}

  getTodasStock() {
    return this.http.get<any>(this.endpoint.TodasStock())
      .toPromise()
  }

  getProductos(Sucur_Id: number, inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.Productos(Sucur_Id, inicio, fin))
      .toPromise()
  }

  getTodasProductos(inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.TodasProductos(inicio,fin))
      .toPromise()
  }

  getVentas(Sucur_Id: number, inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.Ventas(Sucur_Id, inicio, fin))
      .toPromise()
  }

  getPromocion(Sucur_Id: number, inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.Promocion(Sucur_Id, inicio, fin))
      .toPromise()
  }

  getTodasVentas(inicio: string, fin: string) {
   return this.http.get<any>(this.endpoint.TodasVentas(inicio,fin))
      .toPromise()
  } 

  getTodasPromocion(inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.TodasPromocion(inicio,fin))
       .toPromise()
   } 
  
  getClientes(inicio: string, fin: string) {
    return this.http.get<any>(this.endpoint.Clientes(inicio,fin))
      .toPromise()
  }
}
