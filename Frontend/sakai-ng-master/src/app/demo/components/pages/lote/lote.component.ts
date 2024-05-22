import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoteService } from 'src/app/demo/service/lote.service';
import { Lote } from 'src/app/demo/models/LoteViewModel';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './lote.component.html',
    providers: [MessageService]
})
export class LoteComponent implements OnInit {

    loteDialog: boolean = false;

    deleteloteDialog: boolean = false;

    deletelotesDialog: boolean = false;

    lotes: Lote[] = [];

    lote: Lote = {};

    selectedLotes: Lote[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    productos: Producto[] = [];
    sucursales: Sucursal[] = [];

    produid: any;
    sucurid: any;
    fecha:any;

    constructor( private pService: ProductoService,     private router: Router,
        private sService: SucursalService,private loteService: LoteService, private messageService: MessageService) { }

    
    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.loteService.getList().then(data => this.lotes = data);
        this.pService.getList().then(data => this.productos = data);
        this.sService.getList().then(data => this.sucursales = data);

        this.cols = [
            { field: 'lotes_FechaVencimiento', header: 'Fecha vencimiento' },
            { field: 'lotes_Cantidad', header: 'Cantidad' },
            { field: 'produ_Descripcion', header: 'Producto' },
            { field: 'sucur_Descripcion', header: 'Sucursal' },
        ];
    }

    editLote(lote: Lote) {
        this.lote = {...lote };
        this.produid = lote.produ_Id; 
        this.sucurid = lote.sucur_Id; 
        this.fecha = lote.lotes_FechaVencimiento;
        this.loteDialog = true;
        console.log(lote);
    }
    

    deleteLote(lote: Lote) {
        this.deleteloteDialog = true;
        this.lote = { ...lote };
    }

    confirmDeleteSelected() {
        this.deletelotesDialog = false;
        this.lotes = this.lotes.filter(val => !this.selectedLotes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Lotes eliminados.', life: 3000 });
        this.selectedLotes = [];
    }

    confirmDelete() {
        this.deleteloteDialog = false;
    
        this.loteService.Delete(this.lote.lotes_Id).then((response) => {
            if(response.success){
                this.lotes = this.lotes.filter(val => val.lotes_Id!== this.lote.lotes_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Lote eliminado.', life: 3000 });
            this.lote = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El lote esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    saveLote() {
        this.lote.lotes_FechaVencimiento = this.formatDate(this.fecha);
        this.lote.produ_Id = this.produid;
        this.lote.sucur_Id = this.sucurid;


        this.submitted = true;
        this.lote.lotes_UsuarioCreacion = 1;
        this.lote.lotes_UsuarioModificacion = 1;
        console.log(this.lote);
        if (this.lote.lotes_Cantidad?.toString().trim() && this.lote.lotes_FechaVencimiento?.trim() && this.lote.produ_Id?.toString().trim() && this.lote.sucur_Id?.toString().trim()) {
            if (this.lote.lotes_Id) {
                console.log("entra if")
                // @ts-ignore
                this.loteService.Update(this.lote).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Lote actualizado.', life: 3000 });
                            this.loteDialog = false;
                            this.lote = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.lote);

                this.loteService.Insert(this.lote).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Lote creado', life: 3000 });
                            this.loteDialog = false;
                            this.lote = {};
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
        for (let i = 0; i < this.lotes.length; i++) {
            if (this.lotes[i].lotes_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
    openNew() {
        this.lote = {};
        this.submitted = false;
        this.loteDialog = true;
    }
    hideDialog() {
        this.loteDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
