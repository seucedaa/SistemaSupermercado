import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';

@Component({
    templateUrl: './departamento.component.html',
    providers: [MessageService]
})
export class DepartamentoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    departamentos: Departamento[] = [];

    departamento: Departamento = {};

    selectedDepartamentos: Departamento[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private departamentoService: DepartamentoService, private messageService: MessageService) { }

    ngOnInit() {
        this.departamentoService.getList().then(data => this.departamentos = data);

        this.cols = [
            { field: 'depar_Id', header: 'Codigo' },
            { field: 'depar_Descripcion', header: 'Departamento' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
