import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';

@Component({
    templateUrl: './impuesto.component.html',
    providers: [MessageService]
})
export class ImpuestoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    impuestos: Impuesto[] = [];

    impuesto: Impuesto = {};

    selectedImpuestos: Impuesto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private impuestoService: ImpuestoService, private messageService: MessageService) { }

    ngOnInit() {
        this.impuestoService.getList().then(data => this.impuestos = data);

        this.cols = [
            { field: 'impue_Descripcion', header: 'Descripcion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
