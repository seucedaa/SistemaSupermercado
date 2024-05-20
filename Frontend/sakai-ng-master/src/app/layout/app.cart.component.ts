import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { CartService } from './service/app.cart.service'
import { Producto } from '../demo/models/ProductoViewModel'
import { MessageService } from 'primeng/api'
import { Cart } from '../demo/models/CartViewModel'
import { Cliente } from '../demo/models/ClienteViewModel'
import { ClienteService } from '../demo/service/cliente.service'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  facturaCart: Cart[] = []



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
  async pagar() {
    this.isLoading = true;
  
    setTimeout(async () => {
      const estado = await this.cartService.pagarProductos();
  
      if (estado) {
        this.visible = false;
        const facturas = await this.cartService.getFacturas(this.cartService.vedenID);
        this.facturaCart = facturas;
        this.generarFacturaPDF();
        this.cartService.productos = [];
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Transacción fallida.',
        });
      }
  
      this.isLoading = false;
    }, 2000);
  }
  

  generarFacturaPDF() {
    const pdf = new jsPDF('p', 'mm', [100, 297]);
    let yPos = 10; 
  
    pdf.setFontSize(8); 
    pdf.text('Factura', 50, yPos, { align: 'center' }); 
  
    if (this.facturaCart.length > 0) {
      const encabezado = this.facturaCart[0];
      yPos += 10;
      pdf.text(`Cliente: ${encabezado.nombre || 'N/A'}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Sucursal: ${encabezado.sucur_Descripcion}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Fecha: ${new Date(encabezado.venen_FechaCreacion).toLocaleDateString()}`, 5, yPos); 
      yPos += 10;
  
      pdf.text('Producto', 5, yPos);
      pdf.text('Cant.', 60, yPos);
      pdf.text('Precio', 75, yPos);
      pdf.text('Total', 90, yPos);
      yPos += 5;
  
      this.facturaCart.forEach(item => {
        pdf.text(item.produ_Descripcion, 5, yPos); 
        pdf.text(item.vende_Cantidad.toString(), 60, yPos);
        pdf.text(item.vende_Precio.toFixed(2), 75, yPos);
        pdf.text((item.vende_Cantidad * item.vende_Precio).toFixed(2), 90, yPos);
        yPos += 5;
      });
  
      yPos += 10;
      pdf.text(`Subtotal: ${this.facturaCart[0].subtotal.toFixed(2)}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Impuesto: ${this.facturaCart[0].impuesto_Total.toFixed(2)}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Descuento: ${this.facturaCart[0].descuento_Total.toFixed(2)}`, 5, yPos);
      yPos += 5;
      pdf.text(`Total: ${this.facturaCart[0].total.toFixed(2)}`, 5, yPos); 
    }
  
    const pdfBlob = pdf.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfURL, '_blank');
  
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
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
