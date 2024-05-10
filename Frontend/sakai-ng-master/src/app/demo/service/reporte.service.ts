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

  Generarpdf(Sucur_Id: number) {
    const url = this.endpoint.Generarpdf(Sucur_Id);
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  GenerateInvoicePDF(invoiceno:any){
    return this.http.get('https://localhost:44346/Api/Reporte/Generarpdf/'+invoiceno,{observe:'response',responseType:'blob'});
    
  }
  
}
