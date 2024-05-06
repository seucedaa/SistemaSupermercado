import { Injectable } from '@angular/core';
import { Impuesto } from '../models/ImpuestoViewModel';
import { HttpClient } from '@angular/common/http';
import { ImpuestoEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class ImpuestoService {

  constructor(private http:HttpClient) { }
  public endpoint = new ImpuestoEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Impuesto[])
    .then(data => data);
  }

  Insert(model: Impuesto){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Impuesto){
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
