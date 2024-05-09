import { Injectable } from '@angular/core';
import { Cliente } from '../models/ClienteViewModel';
import { ClienteEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http:HttpClient) { }

  public endpoint = new ClienteEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Cliente[])
    .then(data => data);
  }

  getTotal(){
    return this.http.get<any>(this.endpoint.Total()) 
    .toPromise()  
    .then(res => res.data as Cliente[])
    .then(data => data);
  }

  Insert(model: Cliente){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Cliente){
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

  Genero(sucursal: number){
    return this.http.get<any>(this.endpoint.Genero(sucursal))
        .toPromise()
  }

}
