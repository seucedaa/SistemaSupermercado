import { DecimalPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Producto } from 'src/app/demo/models/ProductoViewModel'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  //? PROPIEDADES
  productos: Producto[] = []
  subtotal: number = 0
  total: number = 0
  //? METODOS
  agregarProducto(producto: Producto) {
    this.productos.push(producto)
    this.subtotal += producto.produ_PrecioVenta
    this.total +=
      producto.produ_PrecioVenta +
      producto.produ_PrecioVenta * Number(producto.impue_Descripcion)
  }

  eliminarProducto(producto: Producto, index: number) {
    this.subtotal -= this.productos[index].produ_PrecioVenta
    this.total -=
      Number(this.productos[index].produ_PrecioVenta) +
      this.productos[index].produ_PrecioVenta *
        Number(this.productos[index].impue_Descripcion)
    this.productos.splice(index, 1)
  }

  pagarProductos(): boolean {
    this.productos.forEach((producto) => {
      console.log('pago', producto.produ_Descripcion)
    })
    this.productos = []
    this.subtotal = 0
    this.total = 0
    return true
  }
}
