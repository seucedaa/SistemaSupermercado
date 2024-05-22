import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './estadocivil.component.html',
    providers: [MessageService]
})
export class EstadoCivilComponent implements OnInit {

    estadoDialog: boolean = false;

    deleteEstadoDialog: boolean = false;

    deleteEstadosDialog: boolean = false;

    estadosciviles: EstadoCivil[] = [];

    estadocivil: EstadoCivil = {};

    selectedEstadosCiviles: EstadoCivil[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private router: Router,private estadocivilService: EstadoCivilService, private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.estadocivilService.getList().then(data => this.estadosciviles = data);

        this.cols = [
            { field: 'estad_Descripcion', header: 'Descripcion' },
        ];
    }

    editEstado(estadocivil: EstadoCivil) {
        this.estadocivil = { ...estadocivil };
        this.estadoDialog = true;
    }
    

    deleteEstado(estadocivil: EstadoCivil) {
        this.deleteEstadoDialog = true;
        this.estadocivil = { ...estadocivil };
    }

    confirmDeleteSelected() {
        this.deleteEstadosDialog = false;
        this.estadosciviles = this.estadosciviles.filter(val => !this.selectedEstadosCiviles.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Estados civiles eliminados.', life: 3000 });
        this.selectedEstadosCiviles = [];
    }

    confirmDelete() {
        this.deleteEstadoDialog = false;
    
        this.estadocivilService.Delete(this.estadocivil.estad_Id).then((response) => {
            if(response.success){
                this.estadosciviles = this.estadosciviles.filter(val => val.estad_Id!== this.estadocivil.estad_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Estado civil eliminado.', life: 3000 });
            this.estadocivil = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El estado civil esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estado civil.', life: 3000 });
        });
    }
    
    saveEstado() {
        this.submitted = true;
        this.estadocivil.estad_UsuarioCreacion = 1;
        this.estadocivil.estad_UsuarioModificacion = 1;

        if (this.estadocivil.estad_Descripcion?.trim()) {
            if (this.estadocivil.estad_Id) {
                console.log("entra if")
                // @ts-ignore
                this.estadocivilService.Update(this.estadocivil).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estado civil actualizado.', life: 3000 });
                            this.estadoDialog = false;
                            this.estadocivil = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.estadocivil);

                this.estadocivilService.Insert(this.estadocivil).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estado civil creado', life: 3000 });
                            this.estadoDialog = false;
                            this.estadocivil = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.estadosciviles.length; i++) {
            if (this.estadosciviles[i].estad_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
    openNew() {
        this.estadocivil = {};
        this.submitted = false;
        this.estadoDialog = true;
    }
    hideDialog() {
        this.estadoDialog = false;
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
