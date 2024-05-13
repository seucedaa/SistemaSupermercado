import { Component } from '@angular/core'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { CartService } from 'src/app/layout/service/app.cart.service'
import { MessageService } from 'primeng/api'
import { dE } from '@fullcalendar/core/internal-common'
import { Cart } from 'src/app/demo/models/CartViewModel'
@Component({
  templateUrl: './comprar.component.html',
  providers: [MessageService],
})
export class ComprarComponent {
  constructor(
    private ProductoService: ProductoService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}
  //? PROPIEDADES
  productos: Producto[] = []

  alimentos: any[] = []
  limpieza: any[] = []
  bebidas: any[] = []

  //?METODOS
  ngOnInit() {
    this.cartService.getAlimentos().then((data) => {
      this.alimentos = data
    })

    this.cartService.getBebidas().then((data) => {
      this.bebidas = data
    })

    this.cartService.getLimpieza().then((data) => {
      this.limpieza = data
    })
  }

  agreagar(producto: Cart) {
    this.cartService.agregarProducto(producto)
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'se agrego al carrito .',
      
    })
  }
}
