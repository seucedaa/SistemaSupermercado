import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';

@Component({
    templateUrl: './cliente.component.html',
    providers: [MessageService]
})
export class ClienteComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    clientes: Cliente[] = [];

    cliente: Cliente = {};

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clienteService: ClienteService, private messageService: MessageService) { }

    ngOnInit() {
        this.clienteService.getList().then(data => this.clientes = data);

        this.cols = [
            { field: 'clien_Dni', header: 'DNI' },
            { field: 'clien_NombreCompleto', header: 'Cliente' },
            { field: 'clien_Telefono', header: 'Telefono' },
            { field: 'estad_Descripcion', header: 'Estado Civil' },
            { field: 'sexo', header: 'Sexo' },
            { field: 'clien_Direccion', header: 'Direccion' },
            { field: 'munic_Descripcion', header: 'Municipio' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
