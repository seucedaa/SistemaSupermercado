import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PantallaService } from 'src/app/demo/service/pantalla.service';
import { Pantalla } from 'src/app/demo/models/PantallaViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    roles: Rol[] = [];
    rol: Rol = {
      pantallas: [],
      pantallasD:[]

    };

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    pantallasSeleccionadas: Pantalla[] = [];

    datos: any[] = [];


    constructor(private router: Router,  private route:ActivatedRoute,private messageService: MessageService, private pantallaService: PantallaService, private rolService: RolService) { }

    
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.rolService.PantdelRol(id).then(data => {
            this.rol = data; 
            this.pantallasSeleccionadas = this.rol.pantallas; 
        });

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
    
        return datos;
      }
    
      guardar() {
        this.submitted = true;
        this.rol.roles_UsuarioModificacion = 1; // Supongo que aquí asignas el usuario actual, puedes cambiarlo según tu lógica
    
        if (this.rol.roles_Descripcion?.toString().trim() && this.pantallasSeleccionadas.length > 0) {
            this.rol.pantallas = this.pantallasSeleccionadas.map(pantalla => pantalla.data);
            console.log('entra', this.rol);
    
            this.rolService.Update(this.rol).then(response => {
                if (response.success) {
                  console.log(response);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol actualizado.', life: 3000 });
                    this.ngOnInit();
                    this.router.navigate(['/home/pages/rol']);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Escriba el rol.', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
