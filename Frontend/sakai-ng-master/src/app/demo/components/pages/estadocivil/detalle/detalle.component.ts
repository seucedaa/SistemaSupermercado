import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    estadosciviles: EstadoCivil[] = [];

    estadocivil: EstadoCivil;

    selectedEstadosCiviles: EstadoCivil[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private estadocivilService: EstadoCivilService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.estadocivilService.Details(Number(id)).then(data => this.estadocivil = data);
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
