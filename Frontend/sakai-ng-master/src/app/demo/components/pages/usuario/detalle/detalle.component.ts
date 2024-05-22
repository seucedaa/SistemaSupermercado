import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    usuarios: Usuario[] = [];
    usuarioss: Usuario[] = [];

    usuario: Usuario;


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,    private router: Router,
        private usuarioService: UsuarioService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.usuarioService.Details(Number(id)).then(data => {
            console.log(data);
            this.usuario = data;
        });
        this.usuarioService.Details(Number(id)).then(data => {
            this.usuarioss.push(data);
        });
        
        this.cols = [
            { field: 'UsuarioCreacion', header: 'Creador' },
            { field: 'UsuarioModificacion', header: 'Modificador' },
            { field: 'usuar_FechaCreacion', header: 'FechaC' },
            { field: 'usuar_FechaModificacion', header: 'FechaM' },
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
