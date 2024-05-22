import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { PromocionService } from 'src/app/demo/service/promocion.service';
import { Promocion } from 'src/app/demo/models/PromocionViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    promocions: Promocion[] = [];
    promocionss: Promocion[] = [];

    promocion: Promocion;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,     private router: Router,
        private promocionService: PromocionService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.promocionService.Details(Number(id)).then(data => {
            this.promocion = data;
            console.log(this.promocion);
        });
        this.promocionService.Details(Number(id)).then(data => {
            this.promocionss.push(data);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'promo_FechaCreacion'},
            { field: 'promo_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
