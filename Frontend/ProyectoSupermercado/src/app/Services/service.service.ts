import { Injectable } from '@angular/core';
import { Prueba } from '../Models/pruebaViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  Url = 'https://api.thecatapi.com/v1/categories';

  getpruebas(){
    return this.http.get<Prueba[]>(this.Url);
  }
}
