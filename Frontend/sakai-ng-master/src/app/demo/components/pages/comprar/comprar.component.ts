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
  filteredProductos: Cart[] = []

  alimentos: any[] = []
  limpieza: any[] = []
  bebidas: any[] = []

  sortOptions = [
    { label: 'Ordernar por Producto ', value: 'produ_Descripcion' },
    { label: 'Ordenar por Categoría ', value: 'categ_Descripcion' },
  ];
  sortField: string = '';
  sortOrder: number = 0;

  //?METODOS
  ngOnInit() {
    this.cartService.getProdcutos().then((data) => {
      this.productos = data;
      this.filteredProductos = data; 
    });
  }

  agregar(producto: Cart) {
    const cantidadActualEnCarrito = this.cartService.getCantidadProductoEnCarrito(producto.produ_Id);
    const cantidadAAgregar = producto.contador;
  
    if (cantidadActualEnCarrito + cantidadAAgregar <= producto.lotes_Cantidad) {
      this.cartService.agregarProducto(producto);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Se agregó al carrito.',
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Stock insuficiente',
        detail: `No se pueden agregar más de ${producto.lotes_Cantidad} unidades en total.`,
      });
    }
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
    this.filteredProductos.sort((a, b) => {
      let result = 0;
      if (a[this.sortField] < b[this.sortField]) {
        result = -1;
      } else if (a[this.sortField] > b[this.sortField]) {
        result = 1;
      }
      return result * this.sortOrder;
    });
  }

  aumentarContador(producto: Cart, index: number) {
    const cantidadActualEnCarrito = this.cartService.getCantidadProductoEnCarrito(producto.produ_Id);
  
    if (producto.contador + cantidadActualEnCarrito < producto.lotes_Cantidad) {
      this.filteredProductos[index].contador += 1;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Stock insuficiente',
        detail: `Solo hay ${producto.lotes_Cantidad} unidades en stock.`,
      });
    }
  }
  

  disminuirContador(producto: Cart, index: number) {
    if (producto.contador > 0) {
      this.filteredProductos[index].contador -= 1;
    }
  }

  onFilter(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProductos = this.productos.filter(product =>
      product.produ_Descripcion.toLowerCase().includes(query) ||
      String(product.produ_Id).includes(query)
    );
  }
}
