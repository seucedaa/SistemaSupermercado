import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { dA } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';

@Component({
    templateUrl: './clientess.component.html',
    providers: [MessageService]
})

export class ClientessComponent implements OnInit {

    clientes: Cliente[] = [];
    subscription: Subscription;
    inicio:any;
    fin:any;
    sucursall:any;
    formattedInicio:any;
    formattedFin:any;


    @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef;

    constructor(private layoutService: LayoutService,    private router: Router,
        private reporteService: ReporteService,
    private messageService: MessageService) { 
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
             this.ngOnInit();
         });
     
     const today = new Date();
     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
     this.inicio = firstDayOfMonth;
     this.fin = today;}

      

    cambio(){
      this.formattedInicio = this.formatDate(this.inicio);
      this.formattedFin = this.formatDate(this.fin);

      this.reporteService.getClientes(this.formattedInicio, this.formattedFin).then(response => {
      console.log(this.formattedInicio,this.formattedFin);

        if (response && response.success) {
            this.clientes = response.data;

            if (this.clientes && this.clientes.length > 0) {
                this.generatePDF();
            } 
            else {
                this.generatePDF();
                
            }
        } 
    })
   }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  onFechaChange(type: string, event: any) {
    if (type === 'inicio') {
        this.inicio = event;
    } else if (type === 'fin') {
        this.fin = event;
    }
    this.cambio();
  }

     ngOnInit(){
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
      this.formattedInicio = this.formatDate(this.inicio);
      this.formattedFin = this.formatDate(this.fin);

         this.reporteService.getClientes(this.formattedInicio, this.formattedFin).then(response => {
            if (response && response.success) {
                this.clientes = response.data;
    
                if (this.clientes && this.clientes.length > 0) {
                    this.generatePDF();
                } 
            } 
        })
    }

    todas(){
      this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
           this.ngOnInit();
       });
   
   const today = new Date();
   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
   this.inicio = firstDayOfMonth;
   this.fin = today;

   this.formattedInicio = this.formatDate(this.inicio);
   this.formattedFin = this.formatDate(this.fin);
  
      this.reporteService.getClientes(this.formattedInicio,this.formattedFin).then(response => {
        if (response && response.success) {
            this.clientes = response.data;

            if (this.clientes && this.clientes.length > 0) {
                this.generatePDF();
            }
        } 
    })
    }

    generatePDF() {
      const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'letter'
      });

      doc.setProperties({
        title: 'Clientes',
        subject: 'Reporte de Clientes',
        author: 'Supermercado La Colonia',
        keywords: 'clientes, la colonia',
        creator: 'Supermercado La Colonia'
    });

      const logoURL = 'assets/layout/images/lacolonia/manzana.png';  
      const imgWidth = 80;  
      const imgHeight = 80; 
      const totalclientes = this.clientes.length;

      const usuarioJson = sessionStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioJson);
      const persona = usuario.perso_NombreCompleto;

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
      doc.text('Clientes',centerX, 100, { align: 'center' });

      doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(64, 167, 46);
        doc.text('Fechas: ', 30, 170);
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`${this.formattedInicio} - ${this.formattedFin}`, 70, 170);

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(64, 167, 46);
      doc.text('Total Clientes', pageWidth - 100, 120);
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(totalclientes.toString(), pageWidth - 40, 130);

      autoTable(doc, {
          head: [['Identidad', 'Cliente', 'Telefono', 'Estado Civil', 'Sexo', 'Direccion']],
          body: this.clientes.map(cliente => [
              cliente.clien_Dni,
              cliente.clien_NombreCompleto,
              cliente.clien_Telefono,
              cliente.estad_Descripcion,
              cliente.clien_Sexo,
              cliente.clien_Direccion
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
              doc.text(`Emitido por: ${persona}`,data.settings.margin.left, pageHeight - 40);
              doc.text(`Fecha emitida: ${formattedDate}`, data.settings.margin.left, pageHeight - 30);
              doc.text(`Página ${data.pageNumber}`, data.settings.margin.left, pageHeight - 20);
          }
      });

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      this.pdfViewer.nativeElement.src = pdfUrl;
  }

}