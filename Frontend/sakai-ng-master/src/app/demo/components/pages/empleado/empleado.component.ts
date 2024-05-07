import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';

@Component({
    templateUrl: './empleado.component.html',
    providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

    empleadoDialog: boolean = false;

    deleteempleadoDialog: boolean = false;

    deleteempleadosDialog: boolean = false;

    empleados: Empleado[] = [];

    empleado: Empleado = {};

    selectedEmpleados: Empleado[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private empleadoService: EmpleadoService, private messageService: MessageService) { }

    ngOnInit() {
        this.empleadoService.getList().then(data => this.empleados = data);

        this.cols = [
            { field: 'emple_Dni', header: 'DNI' },
            { field: 'emple_NombreCompleto', header: 'Empleado' },
            { field: 'emple_Correo', header: 'Correo' },
            { field: 'emple_Telefono', header: 'Telefono' },
            { field: 'cargo_Descripcion', header: 'Cargo' },
            { field: 'sucur_Descripcion', header: 'Sucursal' },
            { field: 'emple_Direccion', header: 'Direccion' },
        ];
    }

    deleteEmpleado(empleado: Empleado) {
        this.deleteempleadoDialog = true;
        this.empleado = { ...empleado };
    }

    confirmDeleteSelected() {
        this.deleteempleadosDialog = false;
        this.empleados = this.empleados.filter(val => !this.selectedEmpleados.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleados eliminados.', life: 3000 });
        this.selectedEmpleados = [];
    }

    confirmDelete() {
        this.deleteempleadoDialog = false;
    
        this.empleadoService.Delete(this.empleado.emple_Id).then((response) => {
            console.log(response);
            if(response.success){
                this.empleados = this.empleados.filter(val => val.emple_Id!== this.empleado.emple_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado eliminado.', life: 3000 });
            this.empleado = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El empleado esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.empleados.length; i++) {
            if (this.empleados[i].emple_Id === id) {
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
