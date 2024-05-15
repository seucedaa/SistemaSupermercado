import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './stock.component.html',
    providers: [MessageService]
})

export class StockComponent implements OnInit  {

    productos: Producto[] = [];

    id: any;
    pdfSrc:any;

    sucursales: Sucursal[] = [];
    sucursalid: any;


    @ViewChild('filter') filter!: ElementRef;

    constructor(private reporteService: ReporteService,
      private sucursalService: SucursalService, private messageService: MessageService) { }

      onSucursalChange(sucurid: any) {
        if(sucurid === 0){
          this.todas()
        }else{
          this.sucursalid = sucurid.sucur_Id;
            console.log(this.sucursalid);
            this.cambio();
        }
    } 

    todas(){
      const nombre = localStorage.getItem('nombre');
      // const blob = this.reporteService.Generarpdf(cuerpo, img, this.sucursalid,nombre,fechaC);
      // const url = URL.createObjectURL(blob);
      // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    cambio(){
      const nombre = localStorage.getItem('nombre');

      // const blob = this.reporteService.Generarpdf(cuerpo, img, this.sucursalid,nombre,fechaC);
      // const url = URL.createObjectURL(blob);
      // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

     ngOnInit(){
      this.sucursalService.getList().then(data => this.sucursales = data);
      const sucursa = parseInt(localStorage.getItem('sucursal'));
      const nombre = localStorage.getItem('nombre');

      // const blob = this.reporteService.Generarpdf(cuerpo, img, sucursa,nombre,fechaC);
      // const url = URL.createObjectURL(blob);
      // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
       
    }

  
}