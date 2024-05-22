import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    templateUrl: './detalle.component.html',
    providers: [MessageService]

})
export class DetalleComponent implements OnInit {

    categorias: Categoria[] = [];
    categoriass: Categoria[] = [];

    categoria: Categoria;


    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];



    constructor(private route: ActivatedRoute,    private router: Router,
        private categoriaService: CategoriaService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        const id = this.route.snapshot.paramMap.get('id');
        this.categoriaService.Details(Number(id)).then(data => {
            this.categoria = data;
            console.log(this.categoria);
        });

        this.categoriaService.Details(Number(id)).then(data => {
            this.categoriass.push(data);
            console.log(this.categoriass);
        });
    
        this.cols = [
            { field: 'UsuarioCreacion'},
            { field: 'UsuarioModificacion'},
            { field: 'categ_FechaCreacion'},
            { field: 'categ_FechaModificacion'}
        ];
    }
    
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
