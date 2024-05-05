import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { ActivatedRoute } from '@angular/router';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';

@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    clientes: Cliente[] = [];

    cliente: Cliente;

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];
    estadosciviles: EstadoCivil[] = [];

    estadoid: any;


    constructor(private route: ActivatedRoute,private estadocivilService: EstadoCivilService, private clienteService: ClienteService) { }

    onSucursalChange(id: any) {
        this.estadoid = id.estad_Id;
        console.log(this.estadoid);
    }

     ngOnInit() {
        this.estadocivilService.getList().then(data => this.estadosciviles = data);

        
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
