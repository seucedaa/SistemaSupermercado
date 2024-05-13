import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './ventas.component.html',
    providers: [MessageService]
})

export class VentasComponent implements OnInit {

    productos: Producto[] = [];

    pdf='';
    id: any;
    subscription: Subscription;

    sucursales: Sucursal[] = [];
    sucursalid: any;
    inicio:any;
    fin:any;


    @ViewChild('filter') filter!: ElementRef;

    constructor(private layoutService: LayoutService,private reporteService: ReporteService,
      private sucursalService: SucursalService, private messageService: MessageService) { 
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
             this.ngOnInit();
         });
     
     const today = new Date();
     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
     this.inicio = firstDayOfMonth;
     this.fin = today;}

      onSucursalChange(sucur_Id: any) {
        this.sucursalid = sucur_Id.sucur_Id;
        console.log(this.sucursalid);
        this.cambio();
    }

    cambio(){
      let formattedInicio = null;
      let formattedFin = null;

      formattedInicio = this.formatDate(this.inicio);
      formattedFin = this.formatDate(this.fin);
      const nombre = localStorage.getItem('nombre');

      
      this.reporteService.PDFVentas(this.sucursalid,formattedInicio, formattedFin,nombre).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
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
      let formattedInicio = null;
      let formattedFin = null;

      formattedInicio = this.formatDate(this.inicio);
      formattedFin = this.formatDate(this.fin);

      this.sucursalService.getList().then(data => {
        this.sucursales = data;
        console.log(this.sucursales);
     });
     const sucursa = parseInt(localStorage.getItem('sucursal'));
     const nombre = localStorage.getItem('nombre');


        this.reporteService.PDFVentas(sucursa, formattedInicio, formattedFin, nombre).subscribe(res => {
          let blob: Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          this.pdf = url;
        });
    }

    mostrartodas(){
      let formattedInicio = null;
      let formattedFin = null;

      formattedInicio = this.formatDate(this.inicio);
      formattedFin = this.formatDate(this.fin);
      const nombre = localStorage.getItem('nombre');
  
      this.reporteService.PDFVentas2(formattedInicio, formattedFin,nombre).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
    }

}