import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './proveedor.component.html',
    providers: [MessageService]
})
export class ProveedorComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    proveedores: Proveedor[] = [];

    proveedor: Proveedor = {};

    selectedProveedores: Proveedor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private proveedorService: ProveedorService,    private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.proveedorService.getList().then(data => this.proveedores = data);

        this.cols = [
            { field: 'prove_Marca', header: 'Proveedor' },
            { field: 'contacto', header: 'Contacto' },
            { field: 'prove_Correo', header: 'Correo' },
            { field: 'prove_Telefono', header: 'Telefono' },
            { field: 'prove_Notas', header: 'Nota' },
            { field: 'prove_Direccion', header: 'Direccion' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
