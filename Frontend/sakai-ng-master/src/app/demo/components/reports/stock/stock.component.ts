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
    templateUrl: './stock.component.html',
    providers: [MessageService]
})

export class StockComponent implements OnInit {

    productos: Producto[] = [];

    pdf='';
    id: any;

    sucursales: Sucursal[] = [];
    sucursalid: any;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private reporteService: ReporteService,
      private sucursalService: SucursalService, private messageService: MessageService) { }

      onSucursalChange(sucur_Id: any) {
        this.sucursalid = sucur_Id.sucur_Id;
        console.log(this.sucursalid);
        this.cambio();
    }

    todas(){
      this.reporteService.Todas().subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
    }

    cambio(){
      this.reporteService.Generarpdf(this.sucursalid).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
    }

     ngOnInit(){
      this.sucursalService.getList().then(data => this.sucursales = data);

      this.reporteService.Todas().subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdf = url;
      });
       
    }

    mostrartodas(){

      this.todas();
      
   }
  
    
    // Imprimir(id) {
    //     this.reporteService.Generarpdf(id).subscribe(res => {
    //       let blob: Blob = res.body as Blob;
    //       let url = window.URL.createObjectURL(blob);
    //       window.open(url);
    //     });
    // }

    // Preview(id) {
    //     this.reporteService.Generarpdf(id).subscribe(res => {
    //       let blob: Blob = res.body as Blob;
    //       let url = window.URL.createObjectURL(blob);
    //       this.pdf = url;
    //       console.log('PDF URL:', url); // Imprime la URL en la consola
    //       this.mostrar = true;
    //     });
    //   }
      
      

    // Descargar(id) {
    //     this.reporteService.Generarpdf(id).subscribe(res => {
    //       let blob: Blob = res.body as Blob;
    //       let url = window.URL.createObjectURL(blob);

    //       let a=document.createElement('a');
    //       a.download = id;
    //       a.href=url;
    //       a.click();
    //     });
    // }

}