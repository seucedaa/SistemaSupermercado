import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    clientes: Cliente[] = [];

    cliente: Cliente = {};
    municipio: Municipio = {};

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

    prueba: any;

    constructor(private departamentoService: DepartamentoService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private estadocivilService: EstadoCivilService,private municipioService: MunicipioService, private clienteService: ClienteService) { }

    onEstadIdChange(value: any) {
        this.cliente.estad_Id = value?.estad_Id; 
        
    }

    onDeparIdChange(codig: any){
        this.municipioService.ListporDept(codig).then(data => this.municipios = data);

    }
    
    onMunicIdChange(value: any) {
        this.cliente.munic_Id = value?.munic_Id; 
    }
    
    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }

        this.estadocivilService.getList().then(data => this.estadosciviles = data);
        this.departamentoService.getList().then(data => this.departamentos = data);
        this.municipioService.getList().then(data => this.municipios = data);
    
        const id = this.route.snapshot.paramMap.get('id');
        this.clienteService.Details(Number(id)).then(data => {
            this.cliente = data;

            let prueba: any;
            prueba = this.estadosciviles.find(est => est.estad_Id === this.cliente.estad_Id);
            this.estadoid = prueba.estad_Id;
            
            const que = this.cliente.munic_Id;
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
                    aver = this.municipios.find(munic => munic.munic_Id === this.cliente.munic_Id);
                    console.log('municipios',this.cliente.munic_Id);
                    this.municipioid = aver.munic_Id;
                
            });

            
        });

        });
        

       

    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.cliente.clien_UsuarioModificacion = 1;


        if (this.cliente.clien_Dni?.trim() && this.cliente.clien_Telefono?.trim() && this.cliente.clien_PrimerNombre?.trim() && this.cliente.clien_SegundoNombre?.trim() && this.cliente.clien_PrimerApellido?.trim() && this.cliente.clien_SegundoApellido?.trim() && this.cliente.estad_Id.toString()?.trim() && this.cliente.clien_Sexo?.trim() && this.cliente.clien_Direccion?.trim() && this.cliente.munic_Id.trim()) {

            this.clienteService.Update(this.cliente).then((response => {
                if(response.success){
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado.', life: 3000 });
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
