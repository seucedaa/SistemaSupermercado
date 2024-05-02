import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';

@Component({
    templateUrl: './estadocivil.component.html',
    providers: [MessageService]
})
export class EstadoCivilComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    estadosciviles: EstadoCivil[] = [];

    estadocivil: EstadoCivil = {};

    selectedEstadosCiviles: EstadoCivil[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private estadocivilService: EstadoCivilService, private messageService: MessageService) { }

    ngOnInit() {
        this.estadocivilService.getList().then(data => this.estadosciviles = data);

        this.cols = [
            { field: 'estad_Descripcion', header: 'Descripcion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
