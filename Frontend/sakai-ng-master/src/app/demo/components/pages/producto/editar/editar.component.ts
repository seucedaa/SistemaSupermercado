import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { ImpuestoService } from 'src/app/demo/service/impuesto.service';
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';

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


    proveedores: Proveedor[] = [];
    proveid: any;


    constructor(private provService: ProveedorService, private categService: CategoriaService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private subcaService: SubcategoriaService,private impueService: ImpuestoService, private productoService: ProductoService) { }

    onImpuedChange(value: any) {
        this.producto.impue_Id = value?.impue_Id; 
        
    }

    onProveIdChange(value: any) {
        this.producto.prove_Id = value?.prove_Id; 
        
    }

    onCategIdChange(codig: any){
        this.subcaService.ListporCat(codig).then(data => this.subcategorias = data);

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
        this.provService.getList().then(data => this.proveedores = data);
        this.categService.getList().then(data => this.categorias = data);
        this.subcaService.getList().then(data => this.subcategorias = data);

        const id = this.route.snapshot.paramMap.get('id');
        this.productoService.Details(Number(id)).then(data => {
            this.producto = data;

            this.subcaid = this.producto.subca_Id;
             let prueba: any;
            prueba = this.impuestos.find(imp => imp.impue_Id === this.producto.impue_Id);
            this.impueid = prueba.impue_Id;

            let prueba2: any;
            prueba2 = this.proveedores.find(prov => prov.prove_Id === this.producto.prove_Id);
            this.proveid = prueba2.prove_Id;
            
            const que = this.producto.subca_Id;
            this.subcaService.Details(que).then(data => {
                this.subcategoria = data;
                console.log(this.subcategoria);

                let ola: any;
                this.categService.getList().then(data => {
                    let dept: any;
                    dept = this.categorias.find(dep => dep.categ_Id === this.subcategoria.categ_Id);
                    this.categid = dept.categ_Id;
                    ola = dept.categ_Id;
                })

                this.subcaService.ListporCat(ola).then(data => {
                    console.log(this.subcategorias);

                    let aver: any;
                    aver = this.subcategorias.find(munic => munic.subca_Id === this.producto.subca_Id);
                    console.log('subcategorias',this.producto.subca_Id);
                
                });
            
            });
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.producto.produ_UsuarioModificacion = 1,
        this.producto.subca_Id = this.subcaid;
        
        console.log("entra al guarda");


        if (this.producto.produ_Descripcion?.trim()) {
            console.log(this.producto);
            console.log("intenta guardar");

            this.productoService.Update(this.producto).then((response => {
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

    onUpload(event) {
      const file: File = event.files[0];
      if (file) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueFileName = uniqueSuffix + '-' + file.name;
        console.log('http://www.proyectosupermercado.somee.com/uploads/' + uniqueFileName);
        this.producto.img = 'http://www.proyectosupermercado.somee.com/uploads/' + uniqueFileName;
        const formData: FormData = new FormData();
  
        formData.append('file', file, uniqueFileName);
        this.productoService.upload(formData).then(data => {
          console.log(data, 'data');
        })
        
      }
    }
}
