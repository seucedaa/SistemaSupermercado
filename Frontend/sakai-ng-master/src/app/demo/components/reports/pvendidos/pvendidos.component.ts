import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './pvendidos.component.html',
    providers: [MessageService]
})

export class PvendidosComponent implements OnInit {

    productos: Producto[] = [];

    pdf='';
    id: any;

    sucursales: Sucursal[] = [];
    sucursalid: any;
    inicio:any;
    fin:any;


    @ViewChild('filter') filter!: ElementRef;

    constructor(private reporteService: ReporteService,
      private sucursalService: SucursalService, private messageService: MessageService) { }

      onSucursalChange(sucur_Id: any) {
        this.sucursalid = sucur_Id.sucur_Id;
        console.log(this.sucursalid);
        this.ngOnInit();
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
    this.ngOnInit();
}

     ngOnInit(){
      let formattedInicio = null;
      let formattedFin = null;

      formattedInicio = this.formatDate(this.inicio);
      formattedFin = this.formatDate(this.fin);

      this.sucursalService.getList().then(data => this.sucursales = data);

        this.reporteService.Generarpdf(this.sucursalid).subscribe(res => {
          let blob: Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          this.pdf = url;
        });
    }

    mostrartodas(){
  
      this.reporteService.Todas().subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
    }

}