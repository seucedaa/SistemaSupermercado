import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { PromocionService } from 'src/app/demo/service/promocion.service';
import { Promocion } from 'src/app/demo/models/PromocionViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './promocion.component.html',
    providers: [MessageService]
})
export class PromocionComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    promociones: Promocion[] = [];

    promocion: Promocion = {};

    selectedPromociones: Promocion[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private promocionService: PromocionService,     private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.promocionService.getList().then(data => this.promociones = data);

        this.cols = [
            { field: 'prom_Descripcion', header: 'Promocion' },
            { field: 'promo_Disminucion', header: 'Disminucion' },
            { field: 'promo_PuntosRequeridos', header: 'Puntos requeridos' },
            { field: 'produ_Descripcion', header: 'Producto' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
