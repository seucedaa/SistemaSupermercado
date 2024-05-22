import { DecimalPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { Cart } from 'src/app/demo/models/CartViewModel'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  //? PROPIEDADES
  URL_API = 'http://www.proyectosupermercado.somee.com/API'
  productos: Cart[] = []
  subtotal: number = 0
  total: number = 0
  clienteID: number;
  metodoPago: number;
  vedenID: number;
  //? METODOS
  agregarProducto(producto: Cart) {
    const existingProductIndex = this.productos.findIndex(p => p.produ_Id === producto.produ_Id);

    if (existingProductIndex !== -1) {
      this.productos[existingProductIndex].contador += producto.contador;
    } else {
      this.productos.push({ ...producto });
    }

    this.calcularTotales();
  }

  eliminarProducto(producto: Cart) {
    const index = this.productos.findIndex(p => p.produ_Id === producto.produ_Id);
    if (index !== -1) {
      this.productos.splice(index, 1);
    }
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = 0;
    this.total = 0;
    this.productos.forEach(producto => {
      const productTotal = producto.produ_PrecioVenta * producto.contador;
      const productTax = productTotal * Number(producto.impue_Descripcion);
      this.subtotal += productTotal;
      this.total += productTotal + productTax;
    });
  }
  
  getCantidadProductoEnCarrito(produ_Id: number): number {
    const producto = this.productos.find(p => p.produ_Id === produ_Id);
    return producto ? producto.contador : 0;
  }
  async pagarProductos(): Promise<boolean> {
    let estado = true;
     
  
    try {
      const encabezadoResponse = await this.CrearFacturaEncabezado({
        clien_Id: this.clienteID,
        tipos_Id: this.metodoPago,
        sucur_Id: this.productos[0].sucur_Id,
      });
  
      console.log(encabezadoResponse, 'encabezadoResponse');
  
      if (encabezadoResponse.codeStatus > 0) {
        const venen_Id = encabezadoResponse.codeStatus;
        this.vedenID = venen_Id;
  
        for (const producto of this.productos) {
          const detalleResponse = await this.CrearFacturaDetalle({
            venen_Id: venen_Id,
            lotes_Id: producto.lotes_Id,
            vende_Cantidad: producto.contador,
          });
  
          if (detalleResponse.codeStatus <= 0) {
            estado = false;
          }
        }
      } else {
        estado = false;
      }
    } catch (error) {
      console.error('Error en la transacción:', error);
      estado = false;
    }
  
    if (estado) {
      this.subtotal = 0;
      this.total = 0;
      this.metodoPago = null;
      this.clienteID = null;
    }
  
    return estado;
  }
  

  getProdcutos(): Promise<Cart[]> {
    return this.http
    .get<any>(this.URL_API + '/Cart/ListarLotes')
    .toPromise()
    .then((res) => res.data as Cart[])
    .then((data) => {
      const product: Cart[] = []
      data.forEach((element) => {
        const url = `assets/demo/images/product/${element.produ_Descripcion}.jpg`;
        if(element.img == null || element.img.length == 0){
          if(element.lotes_Cantidad == 0){
            product.push({ ...element, status: 'outofstock', status_label: 'Agotado' ,contador: 1, img: url });
          }else if(element.lotes_Cantidad > 0 && element.lotes_Cantidad <= 10){
            product.push({ ...element, status: 'lowstock', status_label: 'Casi agotado' ,contador: 1, img: url });
          }else if(element.lotes_Cantidad > 10){
            product.push({ ...element, status: 'instock', status_label: 'Disponible' ,contador: 1, img: url });
          }else{
            product.push({ ...element, contador: 1, img: url });
          }
        } else{
          if(element.lotes_Cantidad == 0){
            product.push({ ...element, status: 'outofstock', status_label: 'Agotado' ,contador: 1, });
          }else if(element.lotes_Cantidad > 0 && element.lotes_Cantidad <= 10){
            product.push({ ...element, status: 'lowstock', status_label: 'Casi agotado' ,contador: 1, });
          }else if(element.lotes_Cantidad > 10){
            product.push({ ...element, status: 'instock', status_label: 'Disponible' ,contador: 1, });
          }else{
            product.push({ ...element, contador: 1, });
          }
        }
      })
      return product
    })
  }

  CrearFacturaEncabezado(model: Cart) {
    return this.http
      .post<any>(this.URL_API + '/Cart/CrearFacturaEncabezado', model)
      .toPromise()
      .then((response) => response.data)
      .catch((error) => console.error('Error al insertar:', error))
  }

  CrearFacturaDetalle(model: Cart) {
    return this.http
      .post<any>(this.URL_API + '/Cart/CrearFacturaDetalle', model)
      .toPromise()
      .then((response) => response.data)
      .catch((error) => console.error('Error al insertar:', error))
  }

  getFacturas(id: number): Promise<Cart[]> {
    return this.http
      .get<any>(this.URL_API + '/Cart/BuscarFactura?id=' + id)
      .toPromise()
      .then((res) => res.data as Cart[])
      .then((data) => {
        return data
      })
  }
 
  

}
