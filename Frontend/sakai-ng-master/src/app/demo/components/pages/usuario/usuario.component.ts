import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { Router } from '@angular/router';


@Component({
    templateUrl: './usuario.component.html',
    providers: [MessageService]
})
export class UsuarioComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    usuarios: Usuario[] = [];

    usuario: Usuario = {};

    selectedUsuarios: Usuario[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private usuarioService: UsuarioService,    private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.usuarioService.getList().then(data => this.usuarios = data);

        this.cols = [
            { field: 'usuar_Usuario', header: 'Usuario' },
            { field: 'usuar_Correo', header: 'Correo' },
            { field: 'perso_NombreCompleto', header: 'Persona' },
            { field: 'roles_Descripcion', header: 'Rol' },
            { field: 'administrador', header: 'Administrador' },
        ];
    }

   

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
