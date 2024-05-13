import { Injectable } from '@angular/core'
import { Proveedor } from '../models/ProveedorViewModel'
import { HttpClient } from '@angular/common/http'
import { ProveedorEndPoints } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}
  Url = 'http://www.proyectosupermercado.somee.com'
  public endpoint = new ProveedorEndPoints()

  getList() {
    return this.http
      .get<any>(this.Url + '/List')
      .toPromise()
      .then((res) => res.data as Proveedor[])
      .then((data) => data)
  }

  Insert(model: Proveedor) {
    return this.http.post<any>(this.endpoint.Insert(), model).toPromise()
  }

  Update(model: Proveedor) {
    return this.http.put<any>(this.endpoint.Update(), model).toPromise()
  }

  Details(id: number) {
    return this.http
      .get<Proveedor>(this.endpoint.Details(id.toString()))
      .toPromise()
  }

  Delete(id: number) {
    return this.http
      .delete<any>(this.endpoint.Delete(id.toString()))
      .toPromise()
  }
}
