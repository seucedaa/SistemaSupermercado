import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { CartService } from './service/app.cart.service'
import { Producto } from '../demo/models/ProductoViewModel'
import { MessageService } from 'primeng/api'
import { Cart } from '../demo/models/CartViewModel'

@Component({
  selector: 'app-cart',
  templateUrl: './app.cart.component.html',
  providers: [MessageService],
})
export class AppCartComponent {
  constructor(
    public layoutService: LayoutService,
    public cartService: CartService,
    private messageService: MessageService
  ) {}
  //? PROPIEDADES
  isLoading: boolean = false
  displayModal: boolean = false;


  dni: string;
  nombre: string;
  metodoPago: any;
  metodosPago: any[] = [
    { label: 'Efectivo', value: 'EF' },
    { label: 'Tarjeta de Crédito', value: 'TC' },
    { label: 'Tarjeta de Débito', value: 'TD' }
  ];
  //? METODOS
  get visible(): boolean {
    return this.layoutService.visibleSidebar2
  }
  set visible(_val: boolean) {
    this.layoutService.visibleSidebar2 = _val
  }

  ngOnInit() {
    this.cartService.calcularTotales();
  }
  pagar() {
    this.isLoading = true

    setTimeout(() => {
      if (this.cartService.pagarProductos()) {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Transacción exitosa.',
        })
        this.visible = false
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Transacción fallida.',
        })
      }
      this.isLoading = false
    }, 3000)
  }

  aumentarContador(producto: Cart, index: number) {
    const cantidadActualEnCarrito = this.cartService.getCantidadProductoEnCarrito(producto.produ_Id);
    
    if (cantidadActualEnCarrito < producto.lotes_Cantidad) {
      this.cartService.productos[index].contador += 1;
      this.cartService.calcularTotales();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Stock insuficiente',
        detail: `Solo hay ${producto.lotes_Cantidad} unidades en stock.`,
      });
    }
  }

  disminuirContador(producto: Cart) {
    if (producto.contador > 1) {
      producto.contador -= 1;
    } else {
      this.cartService.eliminarProducto(producto);
    }
    this.cartService.calcularTotales();
  }

  eliminarProducto(producto: Cart) {
    this.cartService.eliminarProducto(producto);
  }


  openModal() {
    this.displayModal = true;
  }

  confirmarPago() {
    this.isLoading = true;
    this.displayModal = false;
    this.isLoading = false;
  }

  buscarCliente(event: Event): void {}
}
