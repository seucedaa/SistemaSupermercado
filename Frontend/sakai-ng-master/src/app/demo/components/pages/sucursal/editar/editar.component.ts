import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    sucursals: Sucursal[] = [];

    sucursal: Sucursal = {};

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];


    municipios: Municipio[] = [];
    municipioid: any;
    municipio: Municipio = {};


    departamentos: Departamento[] = [];
    departid: any;


    constructor(private sucursalService: SucursalService, private departamentoService: DepartamentoService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private municipioService: MunicipioService) { }

    
    onDeparIdChange(codig: any){
        this.municipioService.ListporDept(codig).then(data => this.municipios = data);

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
        this.municipioService.getList().then(data => this.municipios = data);

        const id = this.route.snapshot.paramMap.get('id');
        this.sucursalService.Details(Number(id)).then(data => {
            this.sucursal = data;

            const que = this.sucursal.munic_Id;
            this.municipioService.Details(que.toString()).then(data => {
                this.municipio = data;
                console.log(this.municipio);

                this.municipioid = this.municipio.munic_Id;

                let ola: any;
                this.departamentoService.getList().then(data => {
                    let dept: any;
                    dept = this.departamentos.find(dep => dep.depar_Id === this.municipio.depar_Id);
                    this.departid = dept.depar_Id;
                    //this.municipioid = dept.
                    console.log()
                    ola = dept.depar_Id;
                })
            
            });
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.sucursal.sucur_UsuarioModificacion = 1,
        this.sucursal.munic_Id = this.municipioid;
        console.log("entra al guarda");


        if (this.sucursal.sucur_Descripcion?.trim()) {
            console.log(this.sucursal);
            console.log("intenta guardar");

            this.sucursalService.Update(this.sucursal).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal actualizada.', life: 3000 });
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
