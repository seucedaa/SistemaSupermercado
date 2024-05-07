import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { Router } from '@angular/router';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';

@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    clientes: Cliente[] = [];

    cliente: Cliente = {};

    selectedClientes: Cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    estadosciviles: EstadoCivil[] = [];
    estadoid: any;

    municipios: Municipio[] = [];
    municipioid: any;

    departamentos: Departamento[] = [];
    departid: any;

    constructor(private router: Router, private messageService: MessageService,private departamentoService:DepartamentoService, private estadocivilService: EstadoCivilService,private municipioService: MunicipioService, private clienteService: ClienteService) { }

    onEstadIdChange(value: any) {
        this.cliente.estad_Id = value?.estad_Id; 
    }
    
    onDeparIdChange(value: any){
        const depar = value?.depar_Id;
        this.municipioService.ListporDept(depar).then(data => this.municipios = data);

    }

    onMunicIdChange(value: any) {
        this.cliente.munic_Id = value?.munic_Id; 
    }
    

    ngOnInit() {
        this.cliente.clien_Sexo = 'f'; 
        this.estadocivilService.getList().then(data => this.estadosciviles = data);

        this.departamentoService.getList().then(data => this.departamentos = data);
        //this.cliente.estad_Id = 0;
        //this.estadoid = 0;
    }
    
    
    
    guardar() {
        this.submitted = true;
        this.cliente.clien_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.cliente);
        // this.router.navigate(['/home/pages/cliente']);

        if (this.cliente.clien_Dni?.toString().trim() && this.cliente.clien_Telefono?.toString().trim() && this.cliente.clien_PrimerNombre?.trim() && this.cliente.clien_SegundoNombre?.trim() && this.cliente.clien_PrimerApellido?.trim() && this.cliente.clien_SegundoApellido?.trim() && this.cliente.estad_Id.toString()?.trim() && this.cliente.clien_Sexo?.trim() && this.cliente.clien_Direccion?.trim() && this.cliente.munic_Id.trim()) {
            
            console.log("intenta guardar");
            this.clienteService.Insert(this.cliente).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado.', life: 3000 });
                        this.cliente = {};
                        this.ngOnInit();
                        this.router.navigate(['/home/pages/cliente']);
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
