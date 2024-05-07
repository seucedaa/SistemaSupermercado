import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    impuestos: Impuesto[] = [];
    impuestoss: Impuesto[] = [];

    impuesto: Impuesto;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private impuestoService: ImpuestoService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.impuestoService.Details(Number(id)).then(data => {
            this.impuesto = data;
            console.log(this.impuesto);
        });
        this.impuestoService.Details(Number(id)).then(data => {
            this.impuestoss.push(data);
        });

    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'impue_FechaCreacion'},
            { field: 'impue_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
