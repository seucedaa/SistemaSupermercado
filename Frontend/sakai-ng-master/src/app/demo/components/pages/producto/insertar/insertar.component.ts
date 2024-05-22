import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';

@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    productos: Producto[] = [];

    producto: Producto = {};


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    impuestos: Impuesto[] = [];
    impueid: any;

    subcategorias: Subcategoria[] = [];
    subcaid: any;

    categorias: Categoria[] = [];
    categid: any;

    proveedores: Proveedor[] = [];
    provid: any;

    constructor(private impuestoService: ImpuestoService,private router: Router, private messageService: MessageService,private categoriaService:CategoriaService, private proveedorService: ProveedorService,private subcategoriaService: SubcategoriaService, private productoService: ProductoService) { }

    onImpueIdChange(value: any) {
        this.producto.impue_Id = value?.impue_Id; 
    }
    onProveIdChange(value: any) {
        this.producto.prove_Id = value?.prove_Id; 
    }
    
    onCategIdChange(value: any){
        const depar = value?.categ_Id;
        this.subcategoriaService.ListporCat(depar).then(data => this.subcategorias = data);

    }

    onSubcaIdChange(value: any) {
        this.producto.subca_Id = value?.subca_Id; 
    }
    

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.impuestoService.getList().then(data => this.impuestos = data);
        this.proveedorService.getList().then(data => this.proveedores = data);

        this.categoriaService.getList().then(data => this.categorias = data);


    }
    
    
    
    guardar() {
        this.submitted = true;
        this.producto.produ_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.producto);

        if (this.producto.produ_Descripcion?.trim()) {
            
            console.log("intenta guardar");
            this.productoService.Insert(this.producto).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'producto creado.', life: 3000 });
                        this.producto = {};
                        this.ngOnInit();
                        this.router.navigate(['/home/pages/producto']);
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                }
            }));
        }
    }
    


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
