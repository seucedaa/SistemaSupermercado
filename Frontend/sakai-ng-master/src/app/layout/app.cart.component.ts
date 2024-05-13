import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { CartService } from './service/app.cart.service'
import { Producto } from '../demo/models/ProductoViewModel'
import { MessageService } from 'primeng/api'

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
  //? METODOS
  get visible(): boolean {
    return this.layoutService.visibleSidebar2
  }
  set visible(_val: boolean) {
    this.layoutService.visibleSidebar2 = _val
  }

  ngOnInit() {}
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

  eliminarProducto(producto: Producto, index: number) {
    this.cartService.eliminarProducto(producto, index)
  }
}
