import { Injectable } from '@angular/core';
import { Empleado } from '../models/EmpleadoViewModel';
import { HttpClient } from '@angular/common/http';
import { EmpleadoEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  constructor(private http:HttpClient) { }
  public endpoint = new EmpleadoEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Empleado[])
    .then(data => data);
  }

  Insert(model: Empleado){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Empleado){
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
