import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { LoteService } from 'src/app/demo/service/lote.service';
import { Lote } from 'src/app/demo/models/LoteViewModel';

@Component({
    templateUrl: './lote.component.html',
    providers: [MessageService]
})
export class LoteComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    lotes: Lote[] = [];

    lote: Lote = {};

    selectedLotes: Lote[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private loteService: LoteService, private messageService: MessageService) { }

    ngOnInit() {
        this.loteService.getList().then(data => this.lotes = data);

        this.cols = [
            { field: 'lotes_FechaVencimiento', header: 'Fecha vencimiento' },
            { field: 'lotes_Cantidad', header: 'Cantidad' },
            { field: 'produ_Descripcion', header: 'Producto' },
            { field: 'sucur_Descripcion', header: 'Sucursal' },
        ];
    }

    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
