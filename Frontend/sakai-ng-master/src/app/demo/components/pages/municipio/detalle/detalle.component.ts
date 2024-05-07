import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    municipios: Municipio[] = [];

    municipio: Municipio;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private municipioService: MunicipioService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.municipioService.Details(id).then(data => {
            this.municipio = data;
            console.log(this.municipio);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'munic_FechaCreacion'},
            { field: 'munic_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
