import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './subcategoria.component.html',
    providers: [MessageService]
})
export class SubcategoriaComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    subcategorias: Subcategoria[] = [];

    subcategoria: Subcategoria = {};

    selectedSubcategorias: Subcategoria[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private subcategoriaService: SubcategoriaService,    private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.subcategoriaService.getList().then(data => this.subcategorias = data);

        this.cols = [
            { field: 'subca_Descripcion', header: 'Subcategoria' },
            { field: 'categ_Descripcion', header: 'Categoria' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
