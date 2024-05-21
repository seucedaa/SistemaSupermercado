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

  ListporCat(id: string){
    return this.http.get<any>(this.endpoint.ListporCat(id)) 
    .toPromise()  
    .then(res => res.data as Subcategoria[])
    .then(data => data);
  }

  Insert(model: Subcategoria){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Subcategoria){
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

  SubcategoriaTotal(sucursal: number, inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.SubCategoriaTotal(sucursal, inicio,fin))
        .toPromise()
  }

  Todas(inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.Todas(inicio,fin))
        .toPromise()
  }
}
