import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    productos: Producto[] = [];
    productoss: Producto[] = [];

    producto: Producto;

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,    private router: Router,
        private productoService: ProductoService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.productoService.Details(Number(id)).then(data => {
            console.log(data);
            this.producto = data;
        });
        this.productoService.Details(Number(id)).then(data => {
            this.productoss.push(data);
        });
        
        this.cols = [
            { field: 'UsuarioCreacion', header: 'Creador' },
            { field: 'UsuarioModificacion', header: 'Modificador' },
            { field: 'produ_FechaCreacion', header: 'FechaC' },
            { field: 'produ_FechaModificacion', header: 'FechaM' },
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
