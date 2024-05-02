import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';

@Component({
    templateUrl: './empleado.component.html',
    providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

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
            { field: 'nombre', header: 'Empleado' },
            { field: 'emple_Correo', header: 'Correo' },
            { field: 'emple_Telefono', header: 'Telefono' },
            { field: 'cargo_Descripcion', header: 'Cargo' },
            { field: 'estad_Descripcion', header: 'Estado Civil' },
            { field: 'sucur_Descripcion', header: 'Sucursal' },
            { field: 'emple_Direccion', header: 'Direccion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
