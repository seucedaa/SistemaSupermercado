import { Injectable } from '@angular/core';
import { Promocion } from '../models/PromocionViewModel';
import { HttpClient } from '@angular/common/http';
import { PromocionEndPoints } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Promocion/List';
  public endpoint = new PromocionEndPoints();

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Promocion[])
      .then(data => data);
  }
  Insert(model: Promocion){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Promocion){
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
