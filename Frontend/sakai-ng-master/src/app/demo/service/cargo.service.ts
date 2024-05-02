import { Injectable } from '@angular/core';
import { Cargo } from '../models/CargoViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Cargo/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Cargo[])
      .then(data => data);
  }
}
