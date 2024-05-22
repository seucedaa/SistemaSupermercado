import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    usuarios: Usuario[] = [];

    usuario: Usuario = {};


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    empleados: Empleado[] = [];
    empleid: any;

    roles: Rol[] = [];
    rolid: any;


    constructor(private rolService: ServiceService,private router: Router,  private messageService: MessageService,private route:ActivatedRoute,private usuarioService: UsuarioService,private empleadoService: EmpleadoService) { }


    onRolIdChange(value: any) {
        this.usuario.roles_Id = value?.roles_Id; 
        
    }
    onEmpleIdChange(value: any) {
        this.usuario.perso_Id = value?.perso_Id; 
        
    }
    
    ngOnInit() {
        this.empleadoService.getList().then(data => this.empleados = data);
        this.rolService.getRol().subscribe(data => this.roles = data);

        const id = this.route.snapshot.paramMap.get('id');
        this.usuarioService.Details(Number(id)).then(data => {
            this.usuario = data;

             let prueba: any;
            prueba = this.empleados.find(est => est.emple_Id === this.usuario.perso_Id);
            console.log(prueba);
            this.empleid = prueba.emple_Id;

            let prueba1: any;
            prueba1 = this.roles.find(suc => Number(suc.roles_Id) === this.usuario.roles_Id);
            this.rolid = prueba1.roles_Id;
            
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.usuario.usuar_UsuarioModificacion = 1,
        this.usuario.roles_Id = this.rolid;
        console.log("entra al guarda");


        if (this.usuario.usuar_Usuario?.trim()) {
            console.log(this.usuario);
            console.log("intenta guardar");

            this.usuarioService.Update(this.usuario).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.', life: 3000 });
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
