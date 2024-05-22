import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';
import { ServiceService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';

@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    usuarios: Usuario[] = [];

    usuario: Usuario = {};
    valSwitch: boolean = false;


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    empleados: Empleado[] = [];
    empleid: any;

    roles: Rol[] = [];
    rolid: any;

    constructor(private empleadoService: EmpleadoService, private rolService: ServiceService,private router: Router, private messageService: MessageService, private usuarioService: UsuarioService) { }


    onEmpleIdChange(value: any) {
        this.usuario.perso_Id = value?.perso_Id; 
    }
    onRolIdChange(value: any) {
        this.usuario.roles_Id = value?.roles_Id; 
    }
    
    

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.empleadoService.getList().then(data => this.empleados = data);

        this.rolService.getRol().subscribe(data => this.roles = data);
       

    }
    
    
    
    guardar() {
        this.submitted = true;
        this.usuario.usuar_UsuarioCreacion = 1;
        this.usuario.perso_Id = this.empleid.emple_Id;
        console.log("entra al guarda");
        console.log(this.usuario);

        if (this.usuario.usuar_Usuario?.trim() && this.usuario.usuar_Correo?.trim() ) {
            
            console.log("intenta guardar");
            this.usuarioService.Insert(this.usuario).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'usuario creado.', life: 3000 });
                        this.usuario = {};
                        this.ngOnInit();
                        this.router.navigate(['/home/pages/usuarios']);
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                }
            }));
        }
    }
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
