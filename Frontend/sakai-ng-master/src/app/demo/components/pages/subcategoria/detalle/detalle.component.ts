import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    subcategorias: Subcategoria[] = [];
    subcategoriass: Subcategoria[] = [];

    subcategoria: Subcategoria;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,     private router: Router,
        private subcategoriaService: SubcategoriaService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.subcategoriaService.Details(Number(id)).then(data => {
            this.subcategoria = data;
            console.log(this.subcategoria);
        });
        this.subcategoriaService.Details(Number(id)).then(data => {
            this.subcategoriass.push(data);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'subca_FechaCreacion'},
            { field: 'subca_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
