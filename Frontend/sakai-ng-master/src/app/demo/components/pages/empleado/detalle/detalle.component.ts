import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    empleados: Empleado[] = [];
    empleadoss: Empleado[] = [];

    empleado: Empleado;

    selectedEmpleados: Empleado[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,    private router: Router,
        private empleadoService: EmpleadoService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.empleadoService.Details(Number(id)).then(data => {
            console.log(data);
            this.empleado = data;
        });
        this.empleadoService.Details(Number(id)).then(data => {
            this.empleadoss.push(data);
        });
        
        this.cols = [
            { field: 'UsuarioCreacion', header: 'Creador' },
            { field: 'UsuarioModificacion', header: 'Modificador' },
            { field: 'emple_FechaCreacion', header: 'FechaC' },
            { field: 'emple_FechaModificacion', header: 'FechaM' },
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
