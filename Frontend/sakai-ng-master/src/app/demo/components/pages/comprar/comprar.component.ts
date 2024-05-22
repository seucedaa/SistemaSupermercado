import { Component } from '@angular/core'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { CartService } from 'src/app/layout/service/app.cart.service'
import { MessageService } from 'primeng/api'
import { dE } from '@fullcalendar/core/internal-common'
import { Cart } from 'src/app/demo/models/CartViewModel'
import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { SucursalService } from 'src/app/demo/service/sucursal.service'
import { Sucursal } from 'src/app/demo/models/SucursalViewModel'


@Component({
  templateUrl: './comprar.component.html',
  providers: [MessageService],
  
})
export class ComprarComponent {
  constructor(
    private ProductoService: ProductoService,
    private cartService: CartService,
    private messageService: MessageService,
    private sucursalService: SucursalService
  ) {}
  //? PROPIEDADES
  allProductos: Cart[] = []
  productos: Cart[] = []
  filteredProductos: Cart[] = []

  alimentos: any[] = []
  limpieza: any[] = []
  bebidas: any[] = []

  sucursalesOpciones = [];
  sucursalSelecionada: any;

  sortOptions = [
    { label: 'Ordernar por Producto ', value: 'produ_Descripcion' },
    { label: 'Ordenar por Categoría ', value: 'categ_Descripcion' },
  ];
  sortField: string = '';
  sortOrder: number = 0;

  //?METODOS
  ngOnInit() {
    this.sucursalService.getList().then(data => {
      data.map((suc) => {
        this.sucursalesOpciones.push({label: suc.sucur_Descripcion, value: suc.sucur_Id})
      })
      this.sucursalSelecionada = this.sucursalesOpciones[0].value;
    })

    this.cartService.getProdcutos().then((data) => {
      this.allProductos = data;
      this.filterBySucursal();
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

  onSucursalChange(event: any) {
    this.sucursalSelecionada = event.value;
    this.filterBySucursal();
  }

  filterBySucursal() {
    this.productos = this.allProductos.filter(product => product.sucur_Id === this.sucursalSelecionada);
    this.filteredProductos = [...this.productos];
    this.sortProducts();
  }
}
