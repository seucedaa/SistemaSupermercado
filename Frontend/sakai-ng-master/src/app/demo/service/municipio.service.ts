import { Injectable } from '@angular/core';
import { Municipio } from '../models/MunicipioViewModel';
import { HttpClient } from '@angular/common/http';
import { MunicipioEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class MunicipioService {

  constructor(private http:HttpClient) { }
  public endpoint = new MunicipioEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Municipio[])
    .then(data => data);
  }

  Insert(model: Municipio){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Municipio){
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
