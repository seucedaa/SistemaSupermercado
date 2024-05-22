import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
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

    sucursals: Sucursal[] = [];

    sucursal: Sucursal = {};


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    municipios: Municipio[] = [];
    municipioid: any;

    departamentos: Departamento[] = [];
    departid: any;

    constructor( private sucursalService: SucursalService,private router: Router, private messageService: MessageService,private departamentoService:DepartamentoService, private municipioService: MunicipioService) { }

    
    onDeparIdChange(value: any){
        const depar = value?.depar_Id;
        this.municipioService.ListporDept(depar).then(data => this.municipios = data);

    }

    onMunicIdChange(value: any) {
        this.sucursal.munic_Id = value?.munic_Id; 
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
        this.sucursal.sucur_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.sucursal);

        if (this.sucursal.sucur_Descripcion?.trim() &&  this.sucursal.sucur_Telefono?.trim() && this.sucursal.sucur_Direccion?.trim() && this.sucursal.munic_Id.trim()) {
            
            console.log("intenta guardar");
            this.sucursalService.Insert(this.sucursal).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal creada.', life: 3000 });
                        this.sucursal = {};
                        this.ngOnInit();
                        this.router.navigate(['/home/pages/sucursal']);
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
