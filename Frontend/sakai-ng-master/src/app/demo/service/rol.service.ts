import { Injectable } from '@angular/core';
import { Rol } from '../models/RolViewModel';
import { RolEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private http:HttpClient) { }

  public endpoint = new RolEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Rol[])
    .then(data => data);
  }

  Insert(model: Rol){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Elimparo(model: Rol){
    return this.http.put<any>(this.endpoint.Elimparo(), model) 
      .toPromise()  
  }

  Elimparol(model: Rol){
    return this.http.put<any>(this.endpoint.Elimparol(), model) 
      .toPromise()  
  }

  Update(model: Rol){
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
  PantdelRol(id: string){
    return this.http.get<any>(this.endpoint.PantdelRol(id)) 
    .toPromise()  
    .then(res => res.data as Rol[])
    .then(data => data);
  }
}
