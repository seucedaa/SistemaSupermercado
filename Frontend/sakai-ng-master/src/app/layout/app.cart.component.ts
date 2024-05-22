import { Component, SecurityContext } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { CartService } from './service/app.cart.service'
import { Producto } from '../demo/models/ProductoViewModel'
import { MessageService } from 'primeng/api'
import { Cart } from '../demo/models/CartViewModel'
import { Cliente } from '../demo/models/ClienteViewModel'
import { ClienteService } from '../demo/service/cliente.service'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser'
import { CookieService } from 'ngx-cookie-service'

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
    private clienteService: ClienteService,
    public sanitizer: DomSanitizer,
    private cookieService: CookieService
  ) {}
  //? PROPIEDADES
  isLoading: boolean = false
  displayModal: boolean = false;

  clientes: Cliente[] = [];
  filtrarClientes: Cliente[] = [];
  facturaCart: Cart[] = []

  isCliente: boolean;
  dni: string;
  nombre: string;

  clienteid: number;

  metodosPago: any[] = [
    { label: 'Tarjeta Bancaria', value: 1 },
    { label: 'PayPal', value: 2 },
    { label: 'Transferencia Bancaria', value: 3 },
    { label: 'Efectivo', value: 5 },

  ];

  pdfSRC: any;
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

    this.isCliente = this.cookieService.get('perso_Tipo') == 'true';
    if(this.isCliente){
      this.cartService.clienteID = parseInt(this.cookieService.get('perso_Id'));
    }

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
        this.dni = '';
        this.nombre = '';
        this.clienteid = null;
        this.cartService.metodoPago = null;
        this.cartService.clienteID = null;
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
    const pdf = new jsPDF('p', 'mm', [100, 300]);
    let yPos = 10; 
    const logo = 'assets/layout/images/lacolonia/La-Colonia-transformed-removebg.png';

    const pageWidth = 100;
    const imgWidth = 30;
    const imgX = (pageWidth - imgWidth) / 2;
    pdf.addImage({imageData: logo, format: 'PNG',  x: imgX, y: 5,  width: 30, height: 16});
    yPos += 25;
    
    pdf.setFontSize(8); 
    pdf.text('Factura', pageWidth / 2, yPos, { align: 'center' }); 
    
    if (this.facturaCart.length > 0) {
      const encabezado = this.facturaCart[0];
      yPos += 10;
      pdf.text(`Cliente: ${encabezado.nombre || 'N/A'}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Sucursal: ${encabezado.sucur_Descripcion}`, 5, yPos); 
      yPos += 5;
      pdf.text(`Fecha: ${new Date(encabezado.venen_FechaCreacion).toLocaleDateString()}`, 5, yPos); 
      yPos += 5;

      console.log('Cliente ID:', this.clienteid);
    console.log('Cliente Puntos:', encabezado.clien_Puntos);
      if (this.clienteid > 0) {
        pdf.text(`Puntos del Cliente: ${encabezado.clien_Puntos || 'N/A'}`, 5, yPos); 
        yPos += 10;
      } else {
        yPos += 5;
      }
    
      pdf.text('Producto', 5, yPos);
      pdf.text('Cant.', 30, yPos);
      pdf.text('Precio', 40, yPos);
      pdf.text('Impuesto', 55, yPos);
      pdf.text('Descuento', 70, yPos);
      pdf.text('Subtotal', 85, yPos);
      yPos += 5;
    
      this.facturaCart.forEach(item => {
        const impuesto = item.vende_Impuesto * item.vende_Precio * item.vende_Cantidad;
        const descuento = item.vende_Descuento * item.vende_Cantidad;
        const subtotal = (item.vende_Cantidad * item.vende_Precio + impuesto) - descuento;
  
        pdf.text(item.produ_Descripcion, 5, yPos); 
        pdf.text(item.vende_Cantidad.toString(), 30, yPos);
        pdf.text(item.vende_Precio.toFixed(2), 40, yPos);
        pdf.text(impuesto.toFixed(2), 55, yPos);
        pdf.text(descuento.toFixed(2), 70, yPos);
        pdf.text(subtotal.toFixed(2), 85, yPos);
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

    this.pdfSRC = this.sanitizer.bypassSecurityTrustResourceUrl(pdfURL);
    const iframe = document.querySelector('iframe');
    iframe.onload = () => {
      iframe.contentWindow.print();
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
    this.clienteid = cliente.clien_Id;
  }
  
}
