import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ProveedorService } from 'src/app/demo/service/proveedor.service';
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel';
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

    proveedors: Proveedor[] = [];

    proveedor: Proveedor = {};


    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    municipios: Municipio[] = [];
    municipioid: any;
    municipio: Municipio = {};


    departamentos: Departamento[] = [];
    departid: any;

    constructor( private departamentoService: DepartamentoService, private proveedorService: ProveedorService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private municipioService: MunicipioService) { }

    onDeparIdChange(codig: any){
        this.municipioService.ListporDept(codig).then(data => this.municipios = data);

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
        this.municipioService.getList().then(data => this.municipios = data);

        const id = this.route.snapshot.paramMap.get('id');
        this.proveedorService.Details(Number(id)).then(data => {
            this.proveedor = data;

            const que = this.proveedor.munic_Id;
            this.municipioService.Details(que.toString()).then(data => {
                this.municipio = data;
                console.log(this.municipio);

                let ola: any;
                this.departamentoService.getList().then(data => {
                    let dept: any;
                    dept = this.departamentos.find(dep => dep.depar_Id === this.municipio.depar_Id);
                    this.departid = dept.depar_Id;
                    ola = dept.depar_Id;
                })

                this.municipioService.ListporDept(ola).then(data => {
                    console.log(this.municipios);

                    let aver: any;
                    aver = this.municipios.find(munic => munic.munic_Id === this.proveedor.munic_Id);
                    console.log('municipios',this.proveedor.munic_Id);
                    this.municipioid = aver.munic_Id;
                
                });
            
            });
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.proveedor.prove_UsuarioModificacion = 1,
        this.proveedor.munic_Id = this.municipioid;
        console.log("entra al guarda");


        if (this.proveedor.prove_Marca?.trim()) {
            console.log(this.proveedor);
            console.log("intenta guardar");

            this.proveedorService.Update(this.proveedor).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'proveedor actualizado.', life: 3000 });
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
