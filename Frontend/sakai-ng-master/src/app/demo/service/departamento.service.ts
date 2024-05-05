import { Injectable } from '@angular/core';
import { Departamento } from '../models/DepartamentoViewModel';
import { HttpClient } from '@angular/common/http';
import { DepartamentoEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  constructor(private http:HttpClient) { }
  public endpoint = new DepartamentoEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Departamento[])
    .then(data => data);
  }

  Insert(model: Departamento){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Departamento){
    return this.http.put<any>(this.endpoint.Update(), model) 
      .toPromise()  
  }

  Details(id: string){
    return this.http.get<any>(this.endpoint.Details(id)) 
      .toPromise()  
  }

  Delete(id: string){
    return this.http.delete<any>(this.endpoint.Delete(id)) 
      .toPromise()  
  }
}
