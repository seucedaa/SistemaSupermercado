import { Injectable } from '@angular/core';
import { Rol } from '../models/RolViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/Rol/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as Rol[])
      .then(data => data);
  }
}
