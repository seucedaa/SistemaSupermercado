import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolService } from 'src/app/demo/service/rol.service';
import { Rol } from 'src/app/demo/models/RolViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PantallaService } from 'src/app/demo/service/pantalla.service';
import { Pantalla } from 'src/app/demo/models/PantallaViewModel';
import { PantallaporRolService } from 'src/app/demo/service/pantallaporrol.service';
import { PantallaporRol } from 'src/app/demo/models/PantallaporRolViewModel';

@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    roles: Rol[] = [];
    rol: Rol = {};

    pantallaspr: PantallaporRol[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    pantallasSeleccionadas: number[] = [];

    datos: any[] = [];


    constructor(private router: Router,  private prService: PantallaporRolService,private route:ActivatedRoute,private messageService: MessageService, private pantallaService: PantallaService, private rolService: RolService) { }

    
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.rolService.Details(Number(id)).then(data => {
          this.rol = data;
          console.log(this.rol);

      
      });
        this.rolService.PantdelRol(id).then(data => {
            this.roles = data; 
            this.pantallasSeleccionadas = data.map(pantalla => pantalla.panta_Id);
            console.log(this.roles, this.pantallasSeleccionadas);

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
    
      async guardar() {
        this.submitted = true;
        this.rol.roles_UsuarioCreacion = 1;
        
        this.pantallasSeleccionadas = this.datos.filter(pantalla => pantalla.selected).map(pantalla => pantalla.data);
        console.log(this.pantallasSeleccionadas);
        if (this.rol.roles_Descripcion?.toString().trim() && this.pantallasSeleccionadas.length > 0) {
            console.log('entra', this.rol);
    
            await this.guardarPantallasSeleccionadas(this.rol.roles_Descripcion, this.pantallasSeleccionadas, this.rol.roles_UsuarioCreacion);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol creado.', life: 3000 });
    
            this.ngOnInit();
            this.router.navigate(['/home/pages/rol']);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Escriba el rol.', life: 3000 });
        }
    }
    
    async guardarPantallasSeleccionadas(rol, pantallasSeleccionadas,creador) {
        console.log('seleccionadas ' + pantallasSeleccionadas);
        const response = await fetch('http://www.proyectosupermercado.somee.com/Api/Rol/Insertar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Roles_Descripcion: rol, Pantallas: pantallasSeleccionadas, Roles_UsuarioCreacion: creador}),
        });
    
        if (!response.ok) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Escriba el rol.', life: 3000 });
          return;
        }
    
        const data = await response.json();
    }


    async eliminarPantallasDeseleccionadas(idd, pantallasDeseleccionadas) {
        console.log(idd, pantallasDeseleccionadas);
        const response = await fetch('http://www.proyectosupermercado.somee.com/Api/Rol/EliminarPantalladelRol', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Roles_Id: idd, PantallasD: pantallasDeseleccionadas }),
        });
    
        if (!response.ok) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar pantallas', life: 3000 });
            return;
        }
    
        const data = await response.json();
    }

    onCheckboxChange(event: any, pantallaId: number) {
        const isChecked = event.target.checked;
        const pantallaIdSeleccionada = pantallaId;
    
        if (!isChecked) {
            const idd = this.rol.roles_Id;  
            this.eliminarPantallasDeseleccionadas(idd, [pantallaIdSeleccionada]);
        }
    }
}
