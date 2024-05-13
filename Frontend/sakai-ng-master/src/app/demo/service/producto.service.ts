import { Injectable } from '@angular/core'
import { Producto } from '../models/ProductoViewModel'
import { HttpClient } from '@angular/common/http'
import { ProductoEndPoints } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}
  public endpoint = new ProductoEndPoints()

  getList() {
    return this.http
      .get<any>(this.endpoint.List())
      .toPromise()
      .then((res) => res.data as Producto[])
      .then((data) => data)
  }

  getAlimentos(): Promise<Producto[]> {
    return this.http
      .get<any>(this.endpoint.List())
      .toPromise()
      .then((res) => res.data as Producto[])
      .then((data) => {
        const product: Producto[] = []
        data.forEach((element) => {
          if (
            element.subca_Id == 1 ||
            element.subca_Id == 2 ||
            element.subca_Id == 3
          ) {
            product.push(element)
          }
        })
        return product
      })
  }
  getBebidas(): Promise<Producto[]> {
    return this.http
      .get<any>(this.endpoint.List())
      .toPromise()
      .then((res) => res.data as Producto[])
      .then((data) => {
        const product: Producto[] = []
        data.forEach((element) => {
          if (
            element.subca_Id == 4 ||
            element.subca_Id == 8 ||
            element.subca_Id == 9
          ) {
            product.push(element)
          }
        })
        return product
      })
  }

  getLimpieza(): Promise<Producto[]> {
    return this.http
      .get<any>(this.endpoint.List())
      .toPromise()
      .then((res) => res.data as Producto[])
      .then((data) => {
        const product: Producto[] = []
        data.forEach((element) => {
          if (
            element.subca_Id == 10 ||
            element.subca_Id == 12 ||
            element.subca_Id == 13
          ) {
            product.push(element)
          }
        })
        return product
      })
  }

  Insert(model: Producto) {
    return this.http.post<any>(this.endpoint.Insert(), model).toPromise()
  }

  Update(model: Producto) {
    return this.http.put<any>(this.endpoint.Update(), model).toPromise()
  }

  Details(id: number) {
    return this.http.get<any>(this.endpoint.Details(id.toString())).toPromise()
  }

  Delete(id: number) {
    return this.http
      .delete<any>(this.endpoint.Delete(id.toString()))
      .toPromise()
  }

  Existencia(sucursal: number) {
    return this.http.get<any>(this.endpoint.Existencia(sucursal)).toPromise()
  }
}
