import { Injectable } from '@angular/core';
import { Cargo } from '../models/CargoViewModel';
import { ApiService, CargoEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http:HttpClient) { }

  public endpoint = new CargoEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
      .toPromise() 
      .then(res => res.data as Cargo[])
      .then(data => data);
  }

  Insert(model: Cargo){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }
}
