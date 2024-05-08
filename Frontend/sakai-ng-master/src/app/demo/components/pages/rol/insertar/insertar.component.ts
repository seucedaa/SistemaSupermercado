import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';
import { Router } from '@angular/router';
import { PantallaService } from 'src/app/demo/service/pantalla.service';
import { Pantalla } from 'src/app/demo/models/PantallaViewModel';

@Component({
    templateUrl: './insertar.component.html',
    providers: [MessageService]

})
export class InsertarComponent implements OnInit {

    roles: Rol[] = [];
    rol: Rol = {};

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    //pantallas: Pantalla[] = [];
    //pantalla: Pantalla = {};
    pantallasSeleccionadas: Pantalla[] = [];

    datos: any[] = [];


    constructor(private router: Router, private messageService: MessageService, private pantallaService: PantallaService, private rolService: RolService) { }

    ngOnInit() {
        this.pantallaService.getList().then(data => {
            this.datos = this.construir(data);
        });
    }
    
    construir(pantallas: Pantalla[]): any {
        const datos: any = [];
        const pantallaMap: any = {};
    
        pantallas.forEach(pantalla => {
          pantallaMap[pantalla.panta_Id] = pantalla;
        });
    
        const padre = {
          label: 'Todas las pantallas',
          children: []
        };
    
        datos.push(padre);
    
        const acceso = {
          label: 'Acceso',
          children: []
        };
    
        const general = {
          label: 'General',
          children: []
        };
    
        const supermercado = {
          label: 'Supermercado',
          children: []
        };
    
        const ventas = {
          label: 'Ventas',
          children: []
        };
    
        padre.children.push(acceso, general, supermercado, ventas);
    
        pantallas.forEach(pantalla => {
          switch (pantalla.panta_Esquema) {
            case 1:
              acceso.children.push({ label: pantalla.panta_Descripcion, data: pantalla.panta_Id });
              break;
            case 2:
              general.children.push({ label: pantalla.panta_Descripcion, data: pantalla.panta_Id });
              break;
            case 3:
              supermercado.children.push({ label: pantalla.panta_Descripcion, data: pantalla.panta_Id });
              break;
            case 4:
              ventas.children.push({ label: pantalla.panta_Descripcion, data: pantalla.panta_Id });
              break;
          }
        });
        console.log(acceso.children, general.children, supermercado.children, ventas.children);
    
        return datos;
      }

      
    guardar() {
        this.submitted = true;
        this.rol.roles_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.rol);

        if (this.rol.roles_Descripcion?.toString().trim() ) {
            
            console.log("intenta guardar");
            this.rolService.Insert(this.rol).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol creado.', life: 3000 });
                        this.rol = {};
                        this.ngOnInit();
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
