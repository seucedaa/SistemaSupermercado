import { Injectable } from '@angular/core';
import { Pantalla } from '../models/PantallaViewModel';
import { PantallaEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PantallaService {
  constructor(private http:HttpClient) { }

  public endpoint = new PantallaEndPoints();

  getList(){
    return this.http.get<any>(this.endpoint.List()) 
    .toPromise()  
    .then(res => res.data as Pantalla[])
    .then(data => data);
  }

}
