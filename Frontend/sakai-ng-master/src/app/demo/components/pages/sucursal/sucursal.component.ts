import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { Router } from '@angular/router';


@Component({
    templateUrl: './sucursal.component.html',
    providers: [MessageService]
})
export class SucursalComponent implements OnInit {

    deletesucursalDialog: boolean = false;


    sucursales: Sucursal[] = [];

    sucursal: Sucursal = {};

    selectedSucursales: Sucursal[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private sucursaleservice: SucursalService,     private router: Router
        ,private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.sucursaleservice.getList().then(data => this.sucursales = data);

        this.cols = [
            { field: 'sucur_Descripcion', header: 'Sucursal' },
            { field: 'sucur_Direccion', header: 'Direccion' },
            { field: 'sucur_Telefono', header: 'Telefono' },
            { field: 'munic_Descripcion', header: 'Municipio' },
        ];
    }

    deletesucursal(sucursal:Sucursal) {
        this.deletesucursalDialog = true;
        this.sucursal = { ...sucursal };
    }

    confirmDelete() {
        this.deletesucursalDialog = false;
    
        this.sucursaleservice.Delete(this.sucursal.sucur_Id).then((response) => {
            console.log(response);
            if(response.success){
                this.sucursales = this.sucursales.filter(val => val.sucur_Id!== this.sucursal.sucur_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sucursal eliminada.', life: 3000 });
            this.sucursal = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La sucursal esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la sucursal.', life: 3000 });
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
