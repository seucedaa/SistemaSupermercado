import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
import { Router } from '@angular/router';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';
@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    proveedors: Proveedor[] = [];

    proveedor: Proveedor = {};


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];


    municipios: Municipio[] = [];
    municipioid: any;

    departamentos: Departamento[] = [];
    departid: any;


    constructor( private router: Router, private messageService: MessageService,private departamentoService:DepartamentoService,private municipioService: MunicipioService, private proveedorService: ProveedorService) { }

   
    
    onDeparIdChange(value: any){
        const depar = value?.depar_Id;
        this.municipioService.ListporDept(depar).then(data => this.municipios = data);

    }

    onMunicIdChange(value: any) {
        this.proveedor.munic_Id = value?.munic_Id; 
    }
    

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }

        this.departamentoService.getList().then(data => this.departamentos = data);


    }
    
    
    
    guardar() {
        this.submitted = true;
        this.proveedor.prove_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.proveedor);
        //this.router.navigate(['proveedor']);

        if (this.proveedor.prove_Marca?.trim()) {
            
            console.log("intenta guardar");
            this.proveedorService.Insert(this.proveedor).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'proveedor creado.', life: 3000 });
                        this.proveedor = {};
                        this.ngOnInit();
                        this.router.navigate(['/home/pages/proveedor']);
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
