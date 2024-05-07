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

    filteredProductos: any[] = [];

    loading: boolean = true;

    categorias: Categoria[] = [];

    subcategorias: Subcategoria[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(private reporteService: ReporteService,private categoriaService: CategoriaService, 
                private subcategoriaService: SubcategoriaService, private messageService: MessageService) { }

    async ngOnInit(){
        await this.reporteService.Stock(2).then(data => {
            console.log(data)
            this.productos = data;
            console.log(this.productos, "this.productos")
            this.loading = false;
        });

        await this.categoriaService.getList().then((data => {
            this.categorias = data;
        }))
          console.log(this.categorias)
          
        await this.subcategoriaService.getList().then((data => {
            this.subcategorias = data;
        }))
    }

    onFiltered(){
        this.filteredProductos = [];
        this.filteredProductos = this.productos;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}