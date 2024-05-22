import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { Router } from '@angular/router';


@Component({
    templateUrl: './cliente.component.html',
    providers: [MessageService]
})
export class ClienteComponent implements OnInit {

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

    constructor(private clienteService: ClienteService,    private router: Router,
        private messageService: MessageService) { 
    }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.clienteService.getList().then(data => {
            this.clientes = data;
            console.log(this.clientes); 
        });
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

    deleteCliente(cliente: Cliente) {
        console.log(this.cliente.clien_Id);

        this.deleteclienteDialog = true;
        this.cliente = { ...cliente };
    }

    confirmDeleteSelected() {
        this.deleteclientesDialog = false;
        this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Clientes eliminadas.', life: 3000 });
        this.selectedClientes = [];
    }

    confirmDelete() {
        this.deleteclienteDialog = false;

        this.clienteService.Delete(this.cliente.clien_Id).then((response) => {
            console.log(response);
            if(response.success){
                this.clientes = this.clientes.filter(val => val.clien_Id!== this.cliente.clien_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente eliminado.', life: 3000 });
            this.cliente = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El cliente esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
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
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
