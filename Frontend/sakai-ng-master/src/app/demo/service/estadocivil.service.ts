import { Injectable } from '@angular/core';
import { EstadoCivil } from '../models/EstadoCivilViewModel';
import { HttpClient } from '@angular/common/http';
import { EstadoCivilEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class EstadoCivilService {

  constructor(private http:HttpClient) { }
  public endpoint = new EstadoCivilEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as EstadoCivil[])
    .then(data => data);
  }

  Insert(model: EstadoCivil){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: EstadoCivil){
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
