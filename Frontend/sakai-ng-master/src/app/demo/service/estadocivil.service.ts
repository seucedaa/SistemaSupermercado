import { Injectable } from '@angular/core';
import { EstadoCivil } from '../models/EstadoCivilViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.proyectosupermercado.somee.com/Api/EstadoCivil/List';

  getList(){
    return this.http.get<any>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(res => res.data as EstadoCivil[])
      .then(data => data);
  }
}
