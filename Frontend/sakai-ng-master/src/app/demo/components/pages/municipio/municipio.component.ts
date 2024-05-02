import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';

@Component({
    templateUrl: './municipio.component.html',
    providers: [MessageService]
})
export class MunicipioComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    municipios: Municipio[] = [];

    municipio: Municipio = {};

    selectedMunicipios: Municipio[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private municipioService: MunicipioService, private messageService: MessageService) { }

    ngOnInit() {
        this.municipioService.getList().then(data => this.municipios = data);

        this.cols = [
            { field: 'munic_Id', header: 'Codigo' },
            { field: 'munic_Descripcion', header: 'Municipio' },
            { field: 'depar_Descripcion', header: 'Departamento' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
