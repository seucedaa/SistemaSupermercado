import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './subcategoria.component.html',
    providers: [MessageService]
})
export class SubcategoriaComponent implements OnInit {

    subcategoriaDialog: boolean = false;

    deletesubcategoriaDialog: boolean = false;


    subcategorias: Subcategoria[] = [];

    subcategoria: Subcategoria = {};


    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    categorias: Categoria[] = [];

    rowsPerPageOptions = [5, 10, 20];

    categid: any;

    constructor(private cService:CategoriaService,    private router: Router,
        private subcaService: SubcategoriaService, private messageService: MessageService) { }

    onCategIdChange(value: any) {
        this.subcategoria.categ_Id = value?.categ_Id; 
    }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.subcaService.getList().then(data => this.subcategorias = data);
        this.cService.getList().then(data => this.categorias = data);
        
        this.cols = [
            { field: 'subca_Descripcion', header: 'Sub-Categoria' },
            { field: 'categ_Descripcion', header: 'Categoria' },
        ];
    }

    editSubcategoria(subcategoria: Subcategoria) {
        this.subcategoria = {...subcategoria };
        this.categid = subcategoria.categ_Id; //esto y html
        this.subcategoriaDialog = true;
        console.log(subcategoria);
    }
    
    

    deletesubcategoria(subcategoria: Subcategoria) {
        this.deletesubcategoriaDialog = true;
        this.subcategoria = { ...subcategoria };
    }

    confirmDelete() {
        this.deletesubcategoriaDialog = false;
    
        this.subcaService.Delete(this.subcategoria.subca_Id).then((response) => {
            if(response.success){
                this.subcategorias = this.subcategorias.filter(val => val.subca_Id!== this.subcategoria.subca_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sub-Categoria eliminada.', life: 3000 });
            this.subcategoria = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La Sub-Categoria esta siendo utilizada.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la Sub-Categoria.', life: 3000 });
        });
    }
    
    openNew() {
        this.subcategoria = {};
        this.submitted = false;
        this.subcategoriaDialog = true;

    }
    
    saveSubcategoria() {
        this.submitted = true;
        this.subcategoria.subca_UsuarioCreacion = 1;
        this.subcategoria.subca_UsuarioModificacion = 1;
        this.subcategoria.categ_Id = this.categid;
        console.log(this.subcategoria);


        if (this.subcategoria.subca_Descripcion?.trim()) {
            if (this.subcategoria.subca_Id) {
                console.log("entra editar")
                console.log(this.subcategoria);
                // @ts-ignore
                this.subcaService.Update(this.subcategoria).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Subcategoria actualizado.', life: 3000 });
                            this.subcategoriaDialog = false;
                            this.subcategoria = {};
                            this.categid = '';//esto
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra insertar")
                console.log(this.subcategoria);

                this.subcaService.Insert(this.subcategoria).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sub-Categoria creada.', life: 3000 });
                            this.subcategoriaDialog = false;
                            this.subcategoria = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }

   
    hideDialog() {
        this.subcategoriaDialog = false;
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
