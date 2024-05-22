import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';
import { Router } from '@angular/router';


@Component({
    templateUrl: './departamento.component.html',
    providers: [MessageService]
})
export class DepartamentoComponent implements OnInit {

    departamentoDialog: boolean = false;

    deletedepartamentoDialog: boolean = false;

    deletedepartamentosDialog: boolean = false;

    departamentos: Departamento[] = [];

    departamento: Departamento = {};

    selectedDepartamentos: Departamento[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    nuevodept: boolean = true; 


    constructor(private router: Router,private departamentoService: DepartamentoService, private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.departamentoService.getList().then(data => this.departamentos = data);

        this.cols = [
            { field: 'depar_Id', header: 'Coodigo' },
            { field: 'depar_Descripcion', header: 'Descripcion' },
        ];
    }

    editDepartamento(departamento: Departamento) {
        this.departamento = { ...departamento };
        this.departamentoDialog = true;
        this.nuevodept = false;
    }

    detalleDepartamento(departamento: Departamento) {
        console.log(departamento.depar_Id);
        this.router.navigate(['/detalle', departamento.depar_Id.toString()]);
    }
    

    deleteDepartamento(departamento: Departamento) {
        this.deletedepartamentoDialog = true;
        this.departamento = { ...departamento };
    }

    confirmDeleteSelected() {
        this.deletedepartamentosDialog = false;
        this.departamentos = this.departamentos.filter(val => !this.selectedDepartamentos.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Departamentos eliminados.', life: 3000 });
        this.selectedDepartamentos = [];
    }

    confirmDelete() {
        this.deletedepartamentoDialog = false;
    
        this.departamentoService.Delete(this.departamento.depar_Id).then((response) => {
            if(response.success){
                this.departamentos = this.departamentos.filter(val => val.depar_Id!== this.departamento.depar_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Departamento eliminada.', life: 3000 });
            this.departamento = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El departamento esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el departamento.', life: 3000 });
        });
    }
    
    detalles(){
        this.departamentoService.Details(this.departamento.depar_Id).then(() => {
        }).catch(error => {
        });
    }

    openNew() {
        this.departamento = {};
        this.submitted = false;
        this.departamentoDialog = true;
        this.nuevodept = true;
    }
    
    saveDepartamento() {
        this.submitted = true;
        this.departamento.depar_UsuarioCreacion = 1;
        this.departamento.depar_UsuarioModificacion = 1;

        if (this.departamento.depar_Id?.trim() && this.departamento.depar_Descripcion?.trim()) {
            if (this.nuevodept == false) {
                console.log("entra editar")
                console.log(this.departamento);
                // @ts-ignore
                this.departamentoService.Update(this.departamento).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Departamento actualizado.', life: 3000 });
                            this.departamentoDialog = false;
                            this.departamento = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra insertar")
                console.log(this.departamento);

                this.departamentoService.Insert(this.departamento).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Departamento creado', life: 3000 });
                            this.departamentoDialog = false;
                            this.departamento = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.departamentos.length; i++) {
            if (this.departamentos[i].depar_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    
    hideDialog() {
        this.departamentoDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
