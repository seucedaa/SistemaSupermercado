import { Injectable } from '@angular/core';
import { Rol } from '../models/RolViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.gestiongastos.somee.com/Api/Rol/List';

  getList(){
    return this.http.get<Rol[]>(this.Url)  // Return as an array of Rol
      .toPromise()  // Convert Observable to Promise
      .then(data => data);
  }
}
