import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';

@Component({
    templateUrl: './rol.component.html',
    providers: [MessageService]
})
export class RolComponent implements OnInit {

    deleterolDialog: boolean = false;

    deleterolsDialog: boolean = false;

    roles: Rol[] = [];

    rol: Rol = {
    };

    selectedRoles: Rol[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private rolService: RolService, private messageService: MessageService) { }

    ngOnInit() {
        this.rolService.getList().then(data => this.roles = data);

        this.cols = [
            { field: 'roles_Descripcion', header: 'Descripcion' },
        ];
    }

    deleteRol(rol: Rol) {
        this.deleterolDialog = true;
        this.rol = { ...rol };
    }

    confirmDeleteSelected() {
        this.deleterolsDialog = false;
        this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Roles eliminados.', life: 3000 });
        this.selectedRoles = [];
    }

    confirmDelete() {
        this.deleterolDialog = false;
    
        this.rolService.Delete(this.rol.roles_Id).then((response) => {
            console.log(response);
            if(response.success){
                this.roles = this.roles.filter(val => val.roles_Id!== this.rol.roles_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Rol eliminado.', life: 3000 });
            //this.rol = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El rol esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
