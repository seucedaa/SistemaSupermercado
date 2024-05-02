import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';

@Component({
    templateUrl: './departamento.component.html',
    providers: [MessageService]
})
export class DepartamentoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    departamentos: Departamento[] = [];

    departamento: Departamento = {};

    selectedDepartamentos: Departamento[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private departamentoService: DepartamentoService, private messageService: MessageService) { }

    ngOnInit() {
        this.departamentoService.getList().then(data => this.departamentos = data);

        this.cols = [
            { field: 'depar_Id', header: 'Codigo' },
            { field: 'depar_Descripcion', header: 'Departamento' },
        ];
    }

    openNew() {
        this.departamento = {};
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.departamento.depar_Descripcion?.trim()) {
            if (this.departamento.depar_Id) {
                // @ts-ignore
                this.departamentos[this.findIndexById(this.departamento.depar_Id)] = this.departamento;
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro actualizado.', life: 3000 });
            } else {
                // @ts-ignore
                this.departamentos.push(this.departamento);
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro agregado.', life: 3000 });
            }

            this.departamentos = [...this.departamentos];
            this.productDialog = false;
            this.departamento = {};
        }
    }

    

    findIndexById(depar_Id: string): number {
        let index = -1;
        for (let i = 0; i < this.departamentos.length; i++) {
            if (this.departamentos[i].depar_Id === depar_Id) {
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
