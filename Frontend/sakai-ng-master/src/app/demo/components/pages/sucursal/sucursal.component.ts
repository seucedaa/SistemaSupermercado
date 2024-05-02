import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';

@Component({
    templateUrl: './sucursal.component.html',
    providers: [MessageService]
})
export class SucursalComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    sucursales: Sucursal[] = [];

    sucursal: Sucursal = {};

    selectedSucursales: Sucursal[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private sucursalService: SucursalService, private messageService: MessageService) { }

    ngOnInit() {
        this.sucursalService.getList().then(data => this.sucursales = data);

        this.cols = [
            { field: 'sucur_Descripcion', header: 'Sucursal' },
            { field: 'sucur_Direccion', header: 'Direccion' },
            { field: 'sucur_Telefono', header: 'Telefono' },
            { field: 'munic_Descripcion', header: 'Municipio' },
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
