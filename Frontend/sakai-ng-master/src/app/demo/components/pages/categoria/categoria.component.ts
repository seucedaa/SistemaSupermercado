import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './categoria.component.html',
    providers: [MessageService]
})
export class CategoriaComponent implements OnInit {

    categoriaDialog: boolean = false;

    deletecategoriaDialog: boolean = false;

    deletecategoriasDialog: boolean = false;

    categorias: Categoria[] = [];

    categoria: Categoria = {};

    selectedCategorias: Categoria[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private router: Router,private categoriaService: CategoriaService, private messageService: MessageService) { }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.categoriaService.getList().then(data => this.categorias = data);

        this.cols = [
            { field: 'categ_Descripcion', header: 'Descripcion' },
        ];
    }

    editCategoria(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.categoriaDialog = true;
    }
    

    deleteCategoria(categoria: Categoria) {
        this.deletecategoriaDialog = true;
        this.categoria = { ...categoria };
    }

    confirmDelete() {
        this.deletecategoriaDialog = false;
    
        this.categoriaService.Delete(this.categoria.categ_Id).then((response) => {
            if(response.success){
                this.categorias = this.categorias.filter(val => val.categ_Id!== this.categoria.categ_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Categoria eliminada.', life: 3000 });
            this.categoria = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La categoria esta siendo utilizada.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.', life: 3000 });
        });
    }
    
    saveCategoria() {
        this.submitted = true;
        this.categoria.categ_UsuarioCreacion = 1;
        this.categoria.categ_UsuarioModificacion = 1;

        if (this.categoria.categ_Descripcion?.trim()) {
            if (this.categoria.categ_Id) {
                console.log("entra if")
                this.categoriaService.Update(this.categoria).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoria actualiza.', life: 3000 });
                            this.categoriaDialog = false;
                            this.categoria = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra else")
                console.log(this.categoria);

                this.categoriaService.Insert(this.categoria).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoria creada', life: 3000 });
                            this.categoriaDialog = false;
                            this.categoria = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    openNew() {
        this.categoria = {};
        this.submitted = false;
        this.categoriaDialog = true;
    }
    hideDialog() {
        this.categoriaDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
