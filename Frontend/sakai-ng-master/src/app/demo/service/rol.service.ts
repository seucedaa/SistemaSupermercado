import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Rol,Fill } from '../models/RolViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Pantalla } from '../models/PantallaViewModel';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'Api/Rol/List'

  getRol(){
    return this.http.get<Rol[]>(this.url)
  }


  EnviarRol(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'Api/Rol/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }
  getPantallasDeRol(idRoll: Number) {
    return this.http.get<Pantalla[]>(`${BASE_URL + 'Api/PantallaporRol/PantdelRol/' + idRoll}`);
  }
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'Api/Rol/Fill/' + codigo}`);
  }
  getDetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'Api/Rol/FillDetalles/' + codigo}`);
  }
  EliminarRol(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'Api/Rol/Delete/' + ID}`)
  }
  ActualizarRol(formData){
    return this.http.put(BASE_URL + 'Api/Rol/Edit/', formData)
  }
}
