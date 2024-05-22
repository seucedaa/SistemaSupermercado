import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { Router } from '@angular/router';


@Component({
    templateUrl: './usuario.component.html',
    providers: [MessageService]
})
export class UsuarioComponent implements OnInit {

    productDialog: boolean = false;

    deleteusuarioDialog: boolean = false;


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

    deleteUsuario(usuario: Usuario) {
        this.deleteusuarioDialog = true;
        this.usuario = { ...usuario };
    }

    confirmDelete() {
        this.deleteusuarioDialog = false;
    
        this.usuarioService.Delete(this.usuario.usuar_Id).then((response) => {
            console.log(response);
            if(response.success){
                this.usuarios = this.usuarios.filter(val => val.usuar_Id!== this.usuario.usuar_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'usuario eliminado.', life: 3000 });
            this.usuario = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El usuario esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario.', life: 3000 });
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
