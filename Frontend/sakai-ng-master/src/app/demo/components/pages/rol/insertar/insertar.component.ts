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

    pantallas: Pantalla[] = [];
    pantallasSeleccionadas: Pantalla[] = [];

    constructor(private router: Router, private messageService: MessageService, private pantallaService: PantallaService, private rolService: RolService) { }

    ngOnInit() {
        this.pantallaService.getList().then(data => this.pantallas = data);

        
    }
    
    guardar() {
        this.submitted = true;
        this.rol.roles_UsuarioCreacion = 1;
        console.log("entra al guarda");
        console.log(this.rol);
        this.router.navigate(['rol']);

        if (this.rol.roles_Descripcion?.toString().trim() ) {
            
            console.log("intenta guardar");
            this.rolService.Insert(this.rol).then((response => {
                console.log(response)
                if(response.success){
                    console.log(response.data.codeStatus)
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol creado.', life: 3000 });
                        this.rol = {};
                        this.ngOnInit();
                        //this.router.navigate(['/rol']);
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
