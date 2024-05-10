import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { ReporteService } from 'src/app/demo/service/reporte.service';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';


interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './stock.component.html',
    providers: [MessageService]
})

export class StockComponent implements OnInit {

    productos: Producto[] = [];

    categorias: Categoria[] = [];

    subcategorias: Subcategoria[] = [];
    pdf='';
    id: any;
    mostrar = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private reporteService: ReporteService,private categoriaService: CategoriaService, 
                private subcategoriaService: SubcategoriaService, private messageService: MessageService) { }

    async ngOnInit(){
        await this.reporteService.Stock(8).then(data => {
            console.log(data)
            this.productos = data;
        });

        await this.categoriaService.getList().then((data => {
            this.categorias = data;
        }))
          console.log(this.categorias)
          
        await this.subcategoriaService.getList().then((data => {
            this.subcategorias = data;
        }))
    }

    Imprimir(id) {
        this.reporteService.GenerateInvoicePDF(id).subscribe(res => {
          let blob: Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          window.open(url);
        });
    }

    Preview(id) {
        this.reporteService.GenerateInvoicePDF(id).subscribe(res => {
          let blob: Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          this.pdf = url;
          console.log('PDF URL:', url); // Imprime la URL en la consola
          this.mostrar = true;
        });
      }
      
      

    Descargar(id) {
        this.reporteService.GenerateInvoicePDF(id).subscribe(res => {
          let blob: Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);

          let a=document.createElement('a');
          a.download = id;
          a.href=url;
          a.click();
        });
    }

}