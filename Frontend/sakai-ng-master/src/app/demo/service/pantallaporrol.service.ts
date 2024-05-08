import { Injectable } from '@angular/core';
import { PantallaporRol } from '../models/PantallaporRolViewModel';
import { PantallaporRolEndPoints } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PantallaporRolService {
  constructor(private http:HttpClient) { }

  public endpoint = new PantallaporRolEndPoints();

  getList(id: string){
    return this.http.get<any>(this.endpoint.List(id)) 
    .toPromise()  
    .then(res => res.data as PantallaporRol[])
    .then(data => data);
  }
}
