import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    clientes: Cliente[] = [];
    clientess: Cliente[] = [];

    cliente: Cliente;

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private clienteService: ClienteService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.clienteService.Details(Number(id)).then(data => {
            console.log(data);
            this.cliente = data;
        });

        this.clienteService.Details(Number(id)).then(data => {
            this.clientess.push(data);
            console.log(this.clientess);
        });
        this.cols = [
            { field: 'UsuarioCreacion', header: 'Creador' },
            { field: 'UsuarioModificacion', header: 'Modificador' },
            { field: 'clien_FechaCreacion', header: 'FechaC' },
            { field: 'clien_FechaModificacion', header: 'FechaM' },
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
