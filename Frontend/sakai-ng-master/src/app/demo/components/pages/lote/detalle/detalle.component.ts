import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { LoteService } from 'src/app/demo/service/lote.service';
import { Lote } from 'src/app/demo/models/LoteViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    lotes: Lote[] = [];
    lotess: Lote[] = [];

    lote: Lote;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,     private router: Router,
        private loteService: LoteService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.loteService.Details(Number(id)).then(data => {
            this.lote = data;
            console.log(this.lote);
        });
        this.loteService.Details(Number(id)).then(data => {
            this.lotess.push(data);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'lotes_FechaCreacion'},
            { field: 'lotes_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
