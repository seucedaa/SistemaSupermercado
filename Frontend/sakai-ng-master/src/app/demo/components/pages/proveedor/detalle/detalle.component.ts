import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    proveedors: Proveedor[] = [];
    proveedorss: Proveedor[] = [];

    proveedor: Proveedor;


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,    private router: Router,
        private proveedorService: ProveedorService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.proveedorService.Details(Number(id)).then(data => {
            console.log(data);
            this.proveedor = data;
        });
        this.proveedorService.Details(Number(id)).then(data => {
            this.proveedorss.push(data);
        });
        
        this.cols = [
            { field: 'UsuarioCreacion', header: 'Creador' },
            { field: 'UsuarioModificacion', header: 'Modificador' },
            { field: 'prove_FechaCreacion', header: 'FechaC' },
            { field: 'prove_FechaModificacion', header: 'FechaM' },
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
