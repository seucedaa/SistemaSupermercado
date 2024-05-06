import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/demo/models/ProductoViewModel';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './stock.component.html',
    providers: [MessageService]
})

export class StockComponent implements OnInit {

    products: Producto[] = [];

    loading: boolean = true;

    ngOnInit(){
        
    }
}