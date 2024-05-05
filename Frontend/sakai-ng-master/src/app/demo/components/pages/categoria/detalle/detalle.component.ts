import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    categorias: Categoria[] = [];

    categoria: Categoria;

    selectedCategorias: Categoria[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private categoriaService: CategoriaService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.categoriaService.Details(Number(id)).then(data => this.categoria = data);
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
