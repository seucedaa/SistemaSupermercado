import { Injectable } from '@angular/core';
import { Categoria } from '../models/CategoriaViewModel';
import { HttpClient } from '@angular/common/http';
import { CategoriaEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }
  public endpoint = new CategoriaEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Categoria[])
    .then(data => data);
  }

  CategoriaTotal(sucursal: number, inicio: string, fin: string){
    return this.http.get<any>(this.endpoint.CategoriaTotal(sucursal, inicio,fin))
        .toPromise()
  }

  Insert(model: Categoria){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Categoria){
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
}
