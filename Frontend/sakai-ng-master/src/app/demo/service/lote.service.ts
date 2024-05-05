import { Injectable } from '@angular/core';
import { Lote } from '../models/LoteViewModel';
import { HttpClient } from '@angular/common/http';
import { LoteEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class LoteService {

  constructor(private http:HttpClient) { }
  public endpoint = new LoteEndPoints();
  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Lote[])
    .then(data => data);
  }

  Insert(model: Lote){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Lote){
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
