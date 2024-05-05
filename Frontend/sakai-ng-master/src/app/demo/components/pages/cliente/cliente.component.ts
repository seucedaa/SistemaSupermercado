import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    templateUrl: './cliente.component.html',
    providers: [MessageService]
})
export class ClienteComponent implements OnInit {

    form: FormGroup;
    clienteDialog: boolean = false;

    deleteclienteDialog: boolean = false;

    deleteclientesDialog: boolean = false;

    clientes: Cliente[] = [];

    cliente: Cliente = {};

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private fb: FormBuilder, private clienteService: ClienteService, private messageService: MessageService) { 
        this.form = this.fb.group({
            identidad: [''],
            pnombre:[''],
            snombre:[''],
            papellido:[''],
            sapellido:['']
        })
    }

    ngOnInit() {
        this.clienteService.getList().then(data => this.clientes = data);

        this.cols = [
            { field: 'clien_Dni', header: 'DNI' },
            { field: 'clien_NombreCompleto', header: 'Cliente' },
            { field: 'clien_Telefono', header: 'Telefono' },
            { field: 'estad_Descripcion', header: 'Estado Civil' },
            { field: 'sexo', header: 'Sexo' },
            { field: 'clien_Direccion', header: 'Direccion' },
            { field: 'munic_Descripcion', header: 'Municipio' },
        ];
    }

    editCliente(cliente: Cliente) {
        this.cliente = { ...cliente };
        this.clienteDialog = true;
    }

    detalleCliente(cliente: Cliente) {
    }    
    

    deleteCliente(cliente: Cliente) {
        this.deleteclienteDialog = true;
        this.cliente = { ...cliente };
    }

    confirmDeleteSelected() {
        this.deleteclientesDialog = false;
        this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes eliminadas.', life: 3000 });
        this.selectedClientes = [];
    }

    confirmDelete() {
        this.deleteclienteDialog = false;
    
        this.clienteService.Delete(this.cliente.clien_Id).then((response) => {
            if(response.success){
                this.clientes = this.clientes.filter(val => val.clien_Id!== this.cliente.clien_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente eliminado.', life: 3000 });
            this.cliente = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El cliente esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    
    detalles(){
        this.clienteService.Details(this.cliente.clien_Id).then(() => {
        }).catch(error => {
        });
    }
    
    saveCliente() {
        this.submitted = true;
        this.cliente.clien_UsuarioCreacion = 1;
        this.cliente.clien_UsuarioModificacion = 1;

        if (this.cliente.clien_Dni?.trim()) {
            if (this.cliente.clien_Id) {
                console.log("entra if")
                // @ts-ignore
                this.clienteService.Update(this.cliente).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado.', life: 3000 });
                            this.clienteDialog = false;
                            this.cliente = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.cliente);

                this.clienteService.Insert(this.cliente).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado.', life: 3000 });
                            this.clienteDialog = false;
                            this.cliente = {};
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
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].clien_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
    openNew() {
        this.cliente = {};
        this.submitted = false;
        this.clienteDialog = true;
    }
    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
