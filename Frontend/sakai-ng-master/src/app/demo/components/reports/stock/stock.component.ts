import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ReporteService } from 'src/app/demo/service/reporte.service';


interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './stock.component.html',
    providers: [MessageService]
})

export class StockComponent implements OnInit {

    productos: Producto[] = [];

    loading: boolean = true;

    constructor(private reporteService: ReporteService, private messageService: MessageService) { }

    ngOnInit(){
        this.reporteService.Stock().then(data => {
            this.productos = data
            this.loading = false;
        });
    }
}