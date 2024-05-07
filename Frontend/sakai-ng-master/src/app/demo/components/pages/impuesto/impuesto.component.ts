import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './impuesto.component.html',
    providers: [MessageService]
})
export class ImpuestoComponent implements OnInit {

    impuestoDialog: boolean = false;

    deleteimpuestoDialog: boolean = false;

    deleteimpuestosDialog: boolean = false;

    impuestos: Impuesto[] = [];

    impuesto: Impuesto = {};

    selectedImpuestos: Impuesto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private router: Router,private impuestoService: ImpuestoService, private messageService: MessageService) { }

    ngOnInit() {
        this.impuestoService.getList().then(data => this.impuestos = data);

        this.cols = [
            { field: 'impue_Descripcion', header: 'Descripcion' },
        ];
    }

    editImpuesto(impuesto: Impuesto) {
        this.impuesto = { ...impuesto };
        this.impuestoDialog = true;
    }

    detalleimpuesto(impuesto: Impuesto) {
    }    
    

    deleteImpuesto(impuesto: Impuesto) {
        this.deleteimpuestoDialog = true;
        this.impuesto = { ...impuesto };
    }

    confirmDeleteSelected() {
        this.deleteimpuestosDialog = false;
        this.impuestos = this.impuestos.filter(val => !this.selectedImpuestos.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Impuestos eliminadas.', life: 3000 });
        this.selectedImpuestos = [];
    }

    confirmDelete() {
        this.deleteimpuestoDialog = false;
    
        this.impuestoService.Delete(this.impuesto.impue_Id).then((response) => {
            if(response.success){
                this.impuestos = this.impuestos.filter(val => val.impue_Id!== this.impuesto.impue_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Impuesto eliminado.', life: 3000 });
            this.impuesto = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El impuesto esta siendo utilizada.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    
    detalles(){
        this.impuestoService.Details(this.impuesto.impue_Id).then(() => {
        }).catch(error => {
        });
    }
    
    saveImpuesto() {
        this.submitted = true;
        this.impuesto.impue_UsuarioCreacion = 1;
        this.impuesto.impue_UsuarioModificacion = 1;

        if (this.impuesto.impue_Descripcion?.trim()) {
            if (this.impuesto.impue_Id) {
                console.log("entra if")
                // @ts-ignore
                this.impuestoService.Update(this.impuesto).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Impuesto actualizado.', life: 3000 });
                            this.impuestoDialog = false;
                            this.impuesto = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.impuesto);

                this.impuestoService.Insert(this.impuesto).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Impuesto creado', life: 3000 });
                            this.impuestoDialog = false;
                            this.impuesto = {};
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
        for (let i = 0; i < this.impuestos.length; i++) {
            if (this.impuestos[i].impue_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
    openNew() {
        this.impuesto = {};
        this.submitted = false;
        this.impuestoDialog = true;
    }
    hideDialog() {
        this.impuestoDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
