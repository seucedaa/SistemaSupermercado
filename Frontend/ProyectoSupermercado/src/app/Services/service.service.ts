import { Injectable } from '@angular/core';
import { Prueba } from '../Models/pruebaViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  Url = 'http://www.gestiongastos.somee.com/Api/Rol/List';

  getpruebas(){
    return this.http.get<Prueba[]>(this.Url);
  }
}
