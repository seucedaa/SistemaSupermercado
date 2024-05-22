import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './municipio.component.html',
    providers: [MessageService]
})
export class MunicipioComponent implements OnInit {

    municipioDialog: boolean = false;

    deletemunicipioDialog: boolean = false;

    deletemunicipiosDialog: boolean = false;

    municipios: Municipio[] = [];

    municipio: Municipio = {};

    selectedMunicipios: Municipio[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    departamentos: Departamento[] = [];

    rowsPerPageOptions = [5, 10, 20];

    nuevomuni: boolean = true; 
    deparid: any;

    constructor(private departamentoService:DepartamentoService,    private router: Router,
        private municipioService: MunicipioService, private messageService: MessageService) { }

    onDeparIdChange(value: any) {
        this.municipio.depar_Id = value?.depar_Id; 
    }

    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }
        this.municipioService.getList().then(data => this.municipios = data);
        this.departamentoService.getList().then(data => this.departamentos = data);
        
        this.cols = [
            { field: 'munic_Id', header: 'Codigo' },
            { field: 'munic_Descripcion', header: 'Municipio' },
            { field: 'depar_Descripcion', header: 'Departamento' },
        ];
    }

    editMunicipio(municipio: Municipio) {
        this.municipio = {...municipio };
        this.deparid = municipio.depar_Id; //esto y html
        this.municipioDialog = true;
        this.nuevomuni = false;
        console.log(municipio);
    }
    
    

    deleteMunicipio(municipio: Municipio) {
        this.deletemunicipioDialog = true;
        this.municipio = { ...municipio };
    }

    confirmDeleteSelected() {
        this.deletemunicipiosDialog = false;
        this.municipios = this.municipios.filter(val => !this.selectedMunicipios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Municipios eliminados.', life: 3000 });
        this.selectedMunicipios = [];
    }

    confirmDelete() {
        this.deletemunicipioDialog = false;
    
        this.municipioService.Delete(this.municipio.munic_Id).then((response) => {
            if(response.success){
                this.municipios = this.municipios.filter(val => val.munic_Id!== this.municipio.munic_Id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Municipio eliminado.', life: 3000 });
            this.municipio = {};
            } else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El Municipio esta siendo utilizado.', life: 3000 });
            }
            
        }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el municipio.', life: 3000 });
        });
    }
    
    detalles(){
        this.municipioService.Details(this.municipio.munic_Id).then(() => {
        }).catch(error => {
        });
    }
    openNew() {
        this.municipio = {};
        this.submitted = false;
        this.municipioDialog = true;
        this.nuevomuni = true;

    }
    
    saveMunicipio() {
        this.submitted = true;
        this.municipio.munic_UsuarioCreacion = 1;
        this.municipio.munic_UsuarioModificacion = 1;
        this.municipio.depar_Id = this.deparid; //esto
        console.log(this.municipio);


        if (this.municipio.munic_Id?.trim() && this.municipio.depar_Id?.trim() && this.municipio.munic_Descripcion?.trim()) {
            if (this.nuevomuni == false) {
                console.log("entra editar")
                console.log(this.municipio);
                // @ts-ignore
                this.municipioService.Update(this.municipio).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Municipio actualizado.', life: 3000 });
                            this.municipioDialog = false;
                            this.municipio = {};
                            this.deparid = '';//esto
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));
            } else {
                console.log("entra insertar")
                console.log(this.municipio);

                this.municipioService.Insert(this.municipio).then((response => {
                    console.log(response)
                    if(response.success){
                        console.log(response.data.codeStatus)
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Municipio creado', life: 3000 });
                            this.municipioDialog = false;
                            this.municipio = {};
                            this.ngOnInit();
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                    }
                }));

            }
        }
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.municipios.length; i++) {
            if (this.municipios[i].munic_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    //open-hide modal
   
    hideDialog() {
        this.municipioDialog = false;
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
