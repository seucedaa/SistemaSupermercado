import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    productos: Producto[] = [];

    producto: Producto = {};

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    impuestos: Impuesto[] = [];
    impueid: any;

    subcategorias: Subcategoria[] = [];
    subcaid: any;
    subcategoria: Subcategoria = {};


    categorias: Categoria[] = [];
    categid: any;

    prueba: any;
    proveedores: Proveedor[] = [];
    proveid: any;


    constructor(private proveService: ProveedorService, private impueService: ImpuestoService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private categService: CategoriaService,private subcategService: SubcategoriaService, private pService: ProductoService) { }

    onImpueIdChange(value: any) {
        this.producto.impue_Id = value?.impue_Id; 
        
    }

    onProveIdChange(value: any) {
        this.producto.prove_Id = value?.prove_Id; 
        
    }
    onCategIdChange(codig: any){
        this.subcategService.ListporCat(codig).then(data => this.subcategorias = data);

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
        this.impueService.getList().then(data => this.impuestos = data);
        this.proveService.getList().then(data => this.proveedores = data);
        this.categService.getList().then(data => this.categorias = data);
        this.subcategService.getList().then(data => this.subcategorias = data);

        const id = this.route.snapshot.paramMap.get('id');
        this.pService.Details(Number(id)).then(data => {
            this.producto = data;

            let prueba1: any;
            prueba1 = this.impuestos.find(suc => suc.impue_Id === this.producto.impue_Id);
            this.impueid = prueba1.impue_Id;

            let prueba2: any;
            prueba2 = this.proveedores.find(car => car.prove_Id === this.producto.prove_Id);
            this.proveid = prueba2.prove_Id;
            
            const que = this.producto.subca_Id;
            this.subcategService.Details(que).then(data => {
                this.subcategoria = data;

                let ola: any;
                this.categService.getList().then(data => {
                    let categ: any;
                    categ = this.categorias.find(dep => dep.categ_Id === this.subcategoria.categ_Id);
                    this.categid = categ.categ_Id;
                    ola = categ.categ_Id;
                })

                this.subcategService.ListporCat(ola).then(data => {
                    let aver: any;
                    aver = this.subcategorias.find(subca => subca.subca_Id === this.producto.subca_Id);
                    this.subcaid = aver.subca_Id;
                
                });
            
            });
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.producto.produ_UsuarioModificacion = 1;


        if (this.producto.produ_Descripcion?.trim() && this.producto.produ_Descripcion?.trim() && this.producto.produ_Existencia?.toString().trim() && this.producto.produ_PrecioCompra?.toString().trim() && this.producto.produ_PrecioVenta?.trim() && this.producto.impue_Id.toString()?.trim() && this.producto.subca_Id?.toString().trim() && this.producto.prove_Id.toString().trim()) {
            console.log(this.producto);
            console.log("intenta guardar");

            this.pService.Update(this.producto).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado.', life: 3000 });
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
