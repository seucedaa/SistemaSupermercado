import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CargoService } from 'src/app/demo/service/cargo.service';
import { Cargo } from 'src/app/demo/models/CargoViewModel';

@Component({
    templateUrl: './cargo.component.html',
    providers: [MessageService]
})
export class CargoComponent implements OnInit {

    cargoDialog: boolean = false;

    deletecargoDialog: boolean = false;

    deletecargosDialog: boolean = false;

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

    saveCargo() {
        this.submitted = true;

        if (this.cargo.cargo_Descripcion?.trim()) {
            if (this.cargo.cargo_Id) {
                console.log("entra if")
                // @ts-ignore
                // this.cargo.inventoryStatus = this.cargo.inventoryStatus.value ? this.cargo.inventoryStatus.value : this.cargo.inventoryStatus;
                // this.cargos[this.findIndexById(this.cargo.cargo_Id)] = this.cargo;
                // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'cargo Updated', life: 3000 });
            } else {
                console.log("entra else")
                // this.cargo.id = this.createId();
                // this.cargo.code = this.createId();
                // this.cargo.image = 'cargo-placeholder.svg';
                // @ts-ignore
                // this.cargo.inventoryStatus = this.cargo.inventoryStatus ? this.cargo.inventoryStatus.value : 'INSTOCK';
                
                // this.cargos.push(this.cargo);

                this.cargoService.Insert(this.cargo).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El cargo fue creado exitosamente', life: 3000 });
                            this.cargoDialog = false;
                            this.cargo = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.cargos.length; i++) {
            if (this.cargos[i].cargo_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
    openNew() {
        this.cargo = {};
        this.submitted = false;
        this.cargoDialog = true;
    }
    hideDialog() {
        this.cargoDialog = false;
        this.submitted = false;
    }
    //open-hide modal

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
