import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    municipios: Municipio[] = [];
    municipioss: Municipio[] = [];

    municipio: Municipio;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,     private router: Router,
        private municipioService: MunicipioService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.municipioService.Details(id).then(data => {
            this.municipio = data;
            console.log(this.municipio);
        });
        this.municipioService.Details(id).then(data => {
            this.municipioss.push(data);
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
