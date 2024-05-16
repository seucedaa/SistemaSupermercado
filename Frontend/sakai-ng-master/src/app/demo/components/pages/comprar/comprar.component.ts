import { Component } from '@angular/core'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { CartService } from 'src/app/layout/service/app.cart.service'
import { MessageService } from 'primeng/api'
import { dE } from '@fullcalendar/core/internal-common'
import { Cart } from 'src/app/demo/models/CartViewModel'
import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';


@Component({
  templateUrl: './comprar.component.html',
  providers: [MessageService],
  
})
export class ComprarComponent {
  constructor(
    private ProductoService: ProductoService,
    private cartService: CartService,
    private messageService: MessageService,
  ) {}
  //? PROPIEDADES
  productos: Cart[] = []

  alimentos: any[] = []
  limpieza: any[] = []
  bebidas: any[] = []

  sortOptions: SelectItem[] = [];
  sortField: string = '';
  sortOrder: number = 0;

  //?METODOS
  ngOnInit() {
    this.cartService.getProdcutos().then((data) => {
      this.productos = data
    })

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

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}


  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}
}
