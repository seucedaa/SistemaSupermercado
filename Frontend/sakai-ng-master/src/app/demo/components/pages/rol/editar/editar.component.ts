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
import { NodeService } from 'src/app/demo/service/node.service';
import { TreeNode} from 'primeng/api';


@Component({
    templateUrl: './editar.component.html',
    providers: [MessageService]

})
export class EditarComponent implements OnInit {

    roles: Rol[] = [];
    rol: Rol = {};

    pantalla: Pantalla = {};

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    datos: any[] = [];

    files1: TreeNode[] = [];
    pantallasseleccionadas: TreeNode[] = [];
    pantallasdeseleccionadas: TreeNode[] = [];


    constructor(private router: Router,private route:ActivatedRoute,  private nodeService: NodeService, private messageService: MessageService, private pantallaService: PantallaService, private rolService: RolService) {
        this.rol = {
            pantallas: [],
            pantallasD: []
        };
    }

    updateSelectedScreens(pantIds: number[]) {
      const addedKeys = pantIds.map((id) => id.toString());
      console.log('update metodo es string', addedKeys);
    
      this.pantallasseleccionadas = [];
    
      this.files1.forEach((categoria) => {
        let categoriaSelected = false; 
        categoria.children?.forEach((pantalla) => {
            this.pantallasseleccionadas.push(pantalla);
            categoriaSelected = true; 
        });
    
        if (categoriaSelected) {
          categoria.expanded = true;
        }
      });
    
      this.abrirpadres(this.files1);
    }
    
    abrirpadres(nodes: TreeNode[]) {
      nodes.forEach((node) => {
        if (node.children) {
          const tienehijos = node.children.some((child) =>
            this.pantallasseleccionadas.includes(child)
          );
          if (tienehijos) {
            node.expanded = true;
          }
          this.abrirpadres(node.children);
        }
      });
    }
    
    
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.rolService.Details(Number(id)).then(data => {
          this.rol = data;
      });
  
      this.pantallaService.getList().then(data => {
        const root = { label: 'Todas las pantallas', data: 'Todas las pantallas', icon: 'pi pi-fw pi-folder', children: [] };
        const acceso = { label: 'Acceso', data: 'Acceso', icon: 'pi pi-fw pi-lock', children: [] };
        const general = { label: 'General', data: 'General', icon: 'pi pi-fw pi-cog', children: [] };
        const supermercado = { label: 'Supermercado', data: 'Supermercado', icon: 'pi pi-fw pi-shopping-cart', children: [] };
        const ventas = { label: 'Ventas', data: 'Ventas', icon: 'pi pi-fw pi-chart-bar', children: [] };

        root.children.push(acceso, general, supermercado, ventas);
        data.forEach(pantalla => {
            const esquema = pantalla.panta_Esquema;
            const label = pantalla.panta_Descripcion;
            const key = pantalla.panta_Id;

            const nodoPantalla = { key, label, data: label, icon: 'pi pi-fw pi-file', children: [] };

            if (esquema === 1) {
                acceso.children.push(nodoPantalla);
            } else if (esquema === 2) {
                general.children.push(nodoPantalla);
            } else if (esquema === 3) {
                supermercado.children.push(nodoPantalla);
            } else if (esquema === 4) {
                ventas.children.push(nodoPantalla);
            }
        });

        this.files1 = [root];
        
    });

    this.rolService.PantdelRol(id).then(data => {
      const pantIds = data.map(item => item.panta_Id);
      this.updateSelectedScreens(pantIds);
      console.log(pantIds);
    });
    
  }

  actualizar() {
    this.submitted = true;
    this.rol.roles_UsuarioModificacion = 1;
    console.log(this.rol);
  
    if (this.rol.roles_Descripcion?.trim()) {
      console.log('antes del for');
      this.pantallasseleccionadas.forEach(pantallaSeleccionada => {
        if (pantallaSeleccionada.key !== undefined) {
          this.rol.pantallas.push(pantallaSeleccionada.key);
      }            
    });
  console.log(this.rol.pantallas);
  
      this.rolService.Update(this.rol).then((response => {
        console.log(response)
        if(response.success){
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol actualizado.', life: 3000 });
          this.rol = {};
          //this.ngOnInit();
          //this.router.navigate(['/home/pages/rol']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
        }
      }));
    }
  }
  

    eliminar() {
        console.log(this.rol);
    
            this.pantallasdeseleccionadas.forEach(pantallaDeseleccionada => {
                if (pantallaDeseleccionada.key !== undefined) {
                    this.rol.pantallasD.push(pantallaDeseleccionada.key);
                }            });
            console.log(this.rol.pantallasD);
    
            this.rolService.Elimparol(this.rol).then((response => {
                console.log(response)
                if(response.success){
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Pantalla eliminada.', life: 3000 });
                        //this.rol = {};
                        this.ngOnInit();
                        //this.router.navigate(['/home/pages/rol']);
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.data.messageStatus, life: 3000 });
                }
            }));
        
    }
    
    onNodeSelected(event) {
        this.actualizar();
    }
    
    Deseleccionadas(event) {
        this.eliminar();
    }
}
