import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PromocionService } from 'src/app/demo/service/promocion.service';
import { Promocion } from 'src/app/demo/models/PromocionViewModel';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';

@Component({
    templateUrl: './promocion.component.html',
    providers: [MessageService]
})
export class PromocionComponent implements OnInit {

    promocionDialog: boolean = false;

    deletepromocionDialog: boolean = false;

    promocions: Promocion[] = [];

    promocion: Promocion = {};

    selectedpromocions: Promocion[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    productos: Producto[] = [];
    produid: any;

    constructor(private promocionService: PromocionService,     private router: Router,
        private messageService: MessageService,
    private productoService:ProductoService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.promocionService.getList().then(data => this.promocions = data);
        this.productoService.getList().then(data => this.productos = data);

        this.cols = [
            { field: 'promo_Descripcion', header: 'Promocion' },
            { field: 'promo_Porcentaje', header: 'Porcentaje' },
            { field: 'promo_PuntosRequeridos', header: 'Puntos requeridos' },
            { field: 'produ_Descripcion', header: 'Producto' },
        ];
    }

    editPromocion(promocion: Promocion) {
        this.promocion = {...promocion };
        this.produid = promocion.produ_Id; 
        this.promocionDialog = true;
        console.log(promocion);
    }
    

    deletePromocion(promocion: Promocion) {
        this.deletepromocionDialog = true;
        this.promocion = { ...promocion };
    }

    confirmDelete() {
        this.deletepromocionDialog = false;
    
        this.promocionService.Delete(this.promocion.promo_Id).then((response) => {
            if(response.success){
                this.promocions = this.promocions.filter(val => val.promo_Id!== this.promocion.promo_Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Promocion eliminado.', life: 3000 });
            this.promocion = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El promocion esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    

    savepromocion() {
        this.promocion.produ_Id = this.produid;


        this.submitted = true;
        this.promocion.promo_UsuarioCreacion = 1;
        this.promocion.promo_UsuarioModificacion = 1;
        console.log(this.promocion);
        
        if (this.promocion.promo_Descripcion?.trim() ) {
            if (this.promocion.promo_Id) {
                console.log("entra update")
                // @ts-ignore
                this.promocionService.Update(this.promocion).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Promocion actualizado.', life: 3000 });
                            this.promocionDialog = false;
                            this.promocion = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.promocion);

                this.promocionService.Insert(this.promocion).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Promocion creado', life: 3000 });
                            this.promocionDialog = false;
                            this.promocion = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    openNew() {
        this.promocion = {};
        this.submitted = false;
        this.promocionDialog = true;
    }
    hideDialog() {
        this.promocionDialog = false;
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
