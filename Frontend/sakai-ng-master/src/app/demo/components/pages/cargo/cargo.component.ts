import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { CargoService } from 'src/app/demo/service/cargo.service';
import { Cargo } from 'src/app/demo/models/CargoViewModel';

@Component({
    templateUrl: './cargo.component.html',
    providers: [MessageService]
})
export class CargoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    cargos: Cargo[] = [];

    cargo: Cargo = {};

    selectedCargos: Cargo[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private cargoService: CargoService, private messageService: MessageService) { }

    ngOnInit() {
        this.cargoService.getList().then(data => this.cargos = data);

        this.cols = [
            { field: 'cargo_Descripcion', header: 'Descripcion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
