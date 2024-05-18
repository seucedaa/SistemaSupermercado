import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    templateUrl: './stock.component.html',
    providers: [MessageService]
})
export class StockComponent implements OnInit {

    productos: Producto[] = [];
    sucursales: Sucursal[] = [];
    sucursalid: any;
    sucursa: any;
    @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef;

    constructor(
        private reporteService: ReporteService,
        private sucursalService: SucursalService,
        private messageService: MessageService
    ) { }

    onSucursalChange(sucur_Id: any) {
        this.sucursalid = sucur_Id.sucur_Id;
        if(this.sucursalid == 0){
            this.todas();
        }else{
            this.cambio();
        }   
    }

    todas() {
        this.reporteService.getTodasStock().then(data => {
            this.productos = data;
            this.generatePDF();
        });
    }

    cambio() {
        this.reporteService.getStock(this.sucursalid).then(data => {
            this.productos = data;
            this.generatePDF();
        });
    }

    ngOnInit() {
        this.sucursalService.getList().then(data => {
            this.sucursales = data;
        
            this.sucursales = this.sucursales.map((sucursal: any) => ({
                sucur_Id: sucursal.sucur_Id,
                sucur_Descripcion: sucursal.sucur_Descripcion,
                sucursal_Titulo: `${sucursal.sucur_Id} - ${sucursal.sucur_Descripcion}` // Puedes personalizar el título según tus necesidades
            }));
        
            this.sucursales.unshift({ sucur_Id: 0, sucur_Descripcion: 'Mostrar todas' });
        });
        const usuarioJson = sessionStorage.getItem('usuario');
        const usuario = JSON.parse(usuarioJson);
        this.sucursa = usuario.sucur_Id;

        this.reporteService.getStock(this.sucursa).then(data => {
            this.productos = data;
            this.generatePDF();
        });
    }

    generatePDF() {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'letter'
        });

        const logoURL = 'assets/layout/images/lacolonia/manzana.png';  
        const imgWidth = 80;  
        const imgHeight = 80; 
        const totalProductos = this.productos.length;

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setDrawColor('#40a72e');
        doc.setLineWidth(2);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

        const centerX = pageWidth / 2;

        const logoX = 100;  
        const textX = logoX + imgWidth + 10;  
        const textY = 50;  

        doc.addImage(logoURL, 'JPEG', logoX, textY - imgHeight / 2, imgWidth, imgHeight);

        doc.setFontSize(16);
        doc.setTextColor(64, 167, 46);
        doc.setFont(undefined, 'bold');
        doc.text('SUPERMERCADO LA COLONIA', 170, textY);

        doc.setFontSize(12);
        doc.setTextColor(239, 91, 49);
        doc.setFont(undefined, 'normal');
        doc.text('Paga menos vive mejor', 170, textY + 15);

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.text('Escribenos: servicioalcliente@lacolonia.com', 30, 120);
        doc.text('Servicio al cliente: (+504) 2216-1950', 30, 130);
        doc.text('Oficinas corporativas: (+504) 2216-1900', 30, 140);
        doc.text('Horario de atención en línea: 8:00 A.M. A 8:00 P.M.', 30, 150);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Inventario de Productos',centerX, 100, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(64, 167, 46);
        doc.text('Total Productos', pageWidth - 100, 120);
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(totalProductos.toString(), pageWidth - 40, 130);

        autoTable(doc, {
            head: [['Código', 'Descripción', 'Existencia', 'Precio Compra', 'Precio Venta', 'Categoría', 'Sub-Categoría']],
            body: this.productos.map(producto => [
                producto.produ_Id,
                producto.produ_Descripcion,
                producto.produ_Existencia,
                producto.produ_PrecioCompra,
                producto.produ_PrecioVenta,
                producto.categ_Descripcion,
                producto.subca_Descripcion
            ]),
            startY: 180,
            styles: {
                font: 'helvetica',
                fontSize: 10,
            },
            headStyles: {
                fillColor: [64, 167, 46],
                textColor: [255, 255, 255],
                halign: 'center',
                valign: 'middle',
                fontStyle: 'bold',
            },
            theme: 'grid',
            didDrawPage: (data) => {
                const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

                doc.setFontSize(10);
                doc.text(`Emitido por: `,data.settings.margin.left, pageHeight - 40);
                doc.text(`Fecha emitida: ${formattedDate}`, data.settings.margin.left, pageHeight - 30);
                doc.text(`Página ${data.pageNumber}`, data.settings.margin.left, pageHeight - 20);
            }
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        this.pdfViewer.nativeElement.src = pdfUrl;
    }
}
