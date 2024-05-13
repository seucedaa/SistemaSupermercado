import { Injectable } from '@angular/core';
import { Subcategoria } from '../models/SubcategoriaViewModel';
import { HttpClient } from '@angular/common/http';
import { SubCategoriaEndPoints } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(private http:HttpClient) { }
  public endpoint = new SubCategoriaEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Subcategoria[])
    .then(data => data);
  }


  SubcategoriaTotal(sucursal: number, inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.SubCategoriaTotal(sucursal, inicio,fin))
        .toPromise()
  }

  Todas(inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.Todas(inicio,fin))
        .toPromise()
  }
}
