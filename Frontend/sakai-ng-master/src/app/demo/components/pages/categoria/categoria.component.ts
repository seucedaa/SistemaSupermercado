import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';

@Component({
    templateUrl: './categoria.component.html',
    providers: [MessageService]
})
export class CategoriaComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    categorias: Categoria[] = [];

    categoria: Categoria = {};

    selectedCategorias: Categoria[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private categoriaService: CategoriaService, private messageService: MessageService) { }

    ngOnInit() {
        this.categoriaService.getList().then(data => this.categorias = data);

        this.cols = [
            { field: 'categ_Descripcion', header: 'Descripcion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
