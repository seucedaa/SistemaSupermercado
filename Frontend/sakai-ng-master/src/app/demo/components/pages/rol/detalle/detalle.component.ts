import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { RolService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    rols: Rol[] = [];
    rolss: Rol[] = [];

    rol: Rol;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute, private rolService: RolService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.rolService.Details(Number(id)).then(data => {
            this.rol = data;
            console.log(this.rol);
        });

        this.rolService.Details(Number(id)).then(data => {
            this.rolss.push(data);
            console.log(this.rolss);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'roles_FechaCreacion'},
            { field: 'roles_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
