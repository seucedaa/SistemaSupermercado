import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from 'src/app/demo/models/EmpleadoViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoCivilService } from 'src/app/demo/service/estadocivil.service';
import { EstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { MunicipioService } from 'src/app/demo/service/municipio.service';
import { Municipio } from 'src/app/demo/models/MunicipioViewModel';
import { DepartamentoService } from 'src/app/demo/service/departamento.service';
import { Departamento } from 'src/app/demo/models/DepartamentoViewModel';
import { CargoService } from 'src/app/demo/service/cargo.service';
import { Cargo } from 'src/app/demo/models/CargoViewModel';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import { AnyObject } from 'chart.js/types/basic';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    empleados: Empleado[] = [];

    empleado: Empleado = {};

    selectedEmpleados: Empleado[] = [];

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
    sucursales: Sucursal[] = [];
    sucurid: any;

    cargos: Cargo[] = [];
    cargoid: any;

    constructor(private cargoService: CargoService, private sucursalService: SucursalService, private departamentoService: DepartamentoService,private router: Router, private route:ActivatedRoute, private messageService: MessageService, private estadocivilService: EstadoCivilService,private municipioService: MunicipioService, private empleadoService: EmpleadoService) { }

    onEstadIdChange(value: any) {
        this.empleado.estad_Id = value?.estad_Id; 
        
    }

    onCargoIdChange(value: any) {
        this.empleado.cargo_Id = value?.cargo_Id; 
        
    }
    onSucurIdChange(value: any) {
        this.empleado.sucur_Id = value?.sucur_Id; 
        
    }

    onDeparIdChange(value: any){
        const depar = value?.depar_Id;
        this.municipioService.ListporDept(depar).then(data => this.municipios = data);

    }
    
    onMunicIdChange(value: any) {
        this.empleado.munic_Id = value?.munic_Id; 
    }
    
    ngOnInit() {
        this.estadocivilService.getList().then(data => this.estadosciviles = data);
        this.departamentoService.getList().then(data => this.departamentos = data);
    
        const id = this.route.snapshot.paramMap.get('id');
        this.empleadoService.Details(Number(id)).then(data => {
            this.empleado = data;
            this.estadoid = this.empleado.estad_Id;
            this.municipioid = this.empleado.munic_Id;
            this.cargoid = this.empleado.cargo_Id;
            this.sucurid = this.empleado.sucur_Id;

        
        });
    }
    
    
    
    
    guardar() {
        this.submitted = true;
        this.empleado.emple_UsuarioModificacion = 1,
        console.log("entra al guarda");


        if (this.empleado.emple_Dni?.trim() && this.empleado.emple_Correo?.trim() && this.empleado.cargo_Id?.toString().trim() && this.empleado.sucur_Id?.toString().trim() && this.empleado.emple_Telefono?.trim() && this.empleado.emple_PrimerNombre?.trim() && this.empleado.emple_SegundoNombre?.trim() && this.empleado.emple_PrimerApellido?.trim() && this.empleado.emple_SegundoApellido?.trim() && this.empleado.estad_Id.toString()?.trim() && this.empleado.emple_Sexo?.trim() && this.empleado.emple_Direccion?.trim() && this.empleado.munic_Id.trim()) {
            console.log(this.empleado);
            console.log("intenta guardar");

            this.empleadoService.Update(this.empleado).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado actualizado.', life: 3000 });
                        this.empleado = {};
                        this.ngOnInit();
                        //this.router.navigate(['empleado']);
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
