import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { CargoService } from 'src/app/demo/service/cargo.service';
import { Cargo } from 'src/app/demo/models/CargoViewModel';

@Component({
    templateUrl: './cargo.component.html',
    providers: [MessageService]
})
export class CargoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    cargos: Cargo[] = [];

    cargo: Cargo = {};

    selectedCargos: Cargo[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private cargoService: CargoService, private messageService: MessageService) { }

    ngOnInit() {
        this.cargoService.getList().then(data => this.cargos = data);

        this.cols = [
            { field: 'cargo_Descripcion', header: 'Descripcion' },
        ];
    }

    openNew() {
        this.cargo = {};
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.cargo.cargo_Descripcion?.trim()) {
            if (this.cargo.cargo_Id) {
                // @ts-ignore
                this.cargos[this.findIndexById(this.cargo.cargo_Id)] = this.cargo;
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado.', life: 3000 });
            } else {
                // @ts-ignore
                this.cargos.push(this.cargo);
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro agregado.', life: 3000 });
            }

            this.cargos = [...this.cargos];
            this.productDialog = false;
            this.cargo = {};
        }
    }

    findIndexById(cargo_Id: number): number {
        let index = -1;
        for (let i = 0; i < this.cargos.length; i++) {
            if (this.cargos[i].cargo_Id === cargo_Id) {
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
