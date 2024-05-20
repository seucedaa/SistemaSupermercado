import { DecimalPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { Cart } from 'src/app/demo/models/CartViewModel'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  //? PROPIEDADES
  URL_API = 'http://www.proyectosupermercado.somee.com/API'
  // carrito: Cart[] = []

  productos: Cart[] = []
  subtotal: number = 0
  total: number = 0
  clienteID: number;
  metodoPago: number;
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
  pagarProductos(): boolean {
    let estado = true;
  
    console.log(this.productos[0]);
  
    this.CrearFacturaEncabezado({
      clien_Id: this.clienteID,
      tipos_Id: this.metodoPago,
      sucur_Id: this.productos[0].sucur_Id,
    })
    .then((encabezadoResponse) => {
      console.log(encabezadoResponse, 'encabezadoResponse');
  
      if (encabezadoResponse.codeStatus > 0) {
        const venen_Id = encabezadoResponse.codeStatus; 
  
        const detallesPromises = this.productos.map((producto) => {
          return this.CrearFacturaDetalle({
            venen_Id: venen_Id,
            lotes_Id: producto.lotes_Id,
            vende_Cantidad: producto.contador,
          })
          .then((detalleResponse) => {
            if (detalleResponse.codeStatus <= 0) estado = false;
          })
          .catch((error) => {
            console.error('Error en la transacción:', error);
            estado = false;
          });
        });
  
        return Promise.all(detallesPromises).then(() => {
          if (estado) {
            this.productos = [];
            this.subtotal = 0;
            this.total = 0;
            this.metodoPago = null;
            this.clienteID = null;
          }
          return estado;
        });
      } else {
        estado = false;
        return Promise.resolve(estado);
      }
    })
    .catch((error) => {
      console.error('Error en la transacción:', error);
      estado = false;
      return Promise.resolve(estado);
    });
  
    return estado;
  }
  
  


  getLimpieza(): Promise<Cart[]> {
    return this.http
      .get<any>(this.URL_API + '/Cart/ListarLotes')
      .toPromise()
      .then((res) => res.data as Cart[])
      .then((data) => {
        const product: Cart[] = []
        data.forEach((element) => {
          if (element.categ_Id == 17) {
            const url = `assets/demo/images/product/${element.produ_Descripcion}.jpg`;
            product.push({ ...element, img: url });
          }
        })
        return product
      })
  }

  getAlimentos(): Promise<any[]> {
    return this.http
      .get<any>(this.URL_API + '/Cart/ListarLotes')
      .toPromise()
      .then((res) => res.data as any[])
      .then((data) => {
        const alimentos: any[] = [];
        data.forEach((element) => {
          if (element.categ_Id == 1) {
            const url = `assets/demo/images/product/${element.produ_Descripcion}.jpg`;
            alimentos.push({ ...element, img: url });
          }
        });
        return alimentos;
      });
  }

  getBebidas(): Promise<Cart[]> {
    return this.http
      .get<any>(this.URL_API + '/Cart/ListarLotes')
      .toPromise()
      .then((res) => res.data as Cart[])
      .then((data) => {
        const product: Cart[] = []
        data.forEach((element) => {
          if (element.categ_Id == 4) {
            const url = `assets/demo/images/product/${element.produ_Descripcion}.jpg`;
            product.push({ ...element, img: url });
          }
        })
        return product
      })
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
        if(element.lotes_Cantidad == 0){
          product.push({ ...element, status: 'outofstock', status_label: 'Agotado' ,contador: 1, img: url });
        }else if(element.lotes_Cantidad > 0 && element.lotes_Cantidad <= 10){
          product.push({ ...element, status: 'lowstock', status_label: 'Casi agotado' ,contador: 1, img: url });
        }else if(element.lotes_Cantidad > 10){
          product.push({ ...element, status: 'instock', status_label: 'Disponible' ,contador: 1, img: url });
        }else{
          product.push({ ...element, contador: 1, img: url });
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
      .get<any>(this.URL_API + '/Cart/ListarFacturas?id=' + id)
      .toPromise()
      .then((res) => res.data as Cart[])
      .then((data) => {
        return data
      })
  }
 
  
  getFactura(id: number): Promise<Cart> {
    return this.http
      .get<any>(this.URL_API + '/Cart/ListarFactura?id=' + id)
      .toPromise()
      .then((res) => res.data as Cart)
      .then((data) => {
        return data
      })
  }
}
