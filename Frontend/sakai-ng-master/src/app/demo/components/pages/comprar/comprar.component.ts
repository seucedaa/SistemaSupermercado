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

  sortOptions = [
    { label: 'Producto ', value: 'produ_Descripcion' },
    { label: 'Categoría ', value: 'categ_Descripcion' },
  ];
  sortField: string = '';
  sortOrder: number = 0;

  //?METODOS
  ngOnInit() {
    this.cartService.getProdcutos().then((data) => {
      this.productos = data
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
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    this.sortProducts();
  }

sortProducts() {
  this.productos.sort((a, b) => {
    let result = 0;
    if (a[this.sortField] < b[this.sortField]) {
      result = -1;
    } else if (a[this.sortField] > b[this.sortField]) {
      result = 1;
    }
    return result * this.sortOrder;
  });
}

  aumentarContador( producto: Cart, index: number ) {
    if(producto.lotes_Cantidad > producto.contador){
      this.productos[index].contador += 1
    }
  }

  disminuirContador( producto: Cart, index: number ) {
    
    if(producto.contador > 0){
      this.productos[index].contador -= 1}
  }


  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}
}
