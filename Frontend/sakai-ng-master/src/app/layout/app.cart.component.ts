import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { CartService } from './service/app.cart.service'
import { Producto } from '../demo/models/ProductoViewModel'
import { MessageService } from 'primeng/api'
import { Cart } from '../demo/models/CartViewModel'
import { Cliente } from '../demo/models/ClienteViewModel'
import { ClienteService } from '../demo/service/cliente.service'

@Component({
  selector: 'app-cart',
  templateUrl: './app.cart.component.html',
  providers: [MessageService],
})
export class AppCartComponent {
  constructor(
    public layoutService: LayoutService,
    public cartService: CartService,
    private messageService: MessageService,
    private clienteService: ClienteService
  ) {}
  //? PROPIEDADES
  isLoading: boolean = false
  displayModal: boolean = false;

  clientes: Cliente[] = [];
  filtrarClientes: Cliente[] = [];


  dni: string;
  nombre: string;

  metodosPago: any[] = [
    { label: 'Tarjeta Bancaria', value: 1 },
    { label: 'PayPal', value: 2 },
    { label: 'Transferencia Bancaria', value: 3 },
    { label: 'Efectivo', value: 5 },

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

    this.clienteService
      .getList()
      .then((data) => {
        this.clientes = data;
      })
      .catch((error) => {
        console.log(error);
      });
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
    if(this.formCompleto()) {
      this.pagar();
      this.displayModal = false;
    }
  }

  formCompleto(): boolean {
    return this.cartService.metodoPago != null;
  }

  buscarCliente(event) {
    const query = event.query.toLowerCase();
    this.filtrarClientes = this.clientes.filter(cliente =>
      cliente.clien_Dni.toLowerCase().includes(query)
    );
  }

  onClienteSelect(event: any) {
    const cliente = event.value;

    this.dni = cliente.clien_Dni;
    this.nombre = cliente.clien_NombreCompleto;
    this.cartService.clienteID = cliente.clien_Id;
  }
  
}
