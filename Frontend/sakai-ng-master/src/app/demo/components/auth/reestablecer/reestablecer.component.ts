import { Component } from '@angular/core';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-reestablecer',
    templateUrl: './reestablecer.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: #40a72e !important;
        }
    `]
})
export class ReestablecerComponent {
    public username: string;
    public contrasena: string;
    public codigo: string;
    submitted: boolean = false;
    mostrarreestablecer: boolean = false; 
    ocultr:boolean=true;

    valCheck: string[] = ['remember'];

    usuario: Usuario = {};


    constructor(public layoutService: LayoutService,  public usuarioService: UsuarioService, public router: Router,  private messageService: MessageService) { 
        localStorage.clear();
    }

    reestablecer(){
        this.submitted = true;
        this.ocultr=true;

    
        if (this.username?.trim() && !this.mostrarreestablecer) {
            this.usuarioService.Recuperacion(this.username).then(response => {
                console.log(response);
                if (response) {
                    console.log('entr');
                    this.mostrarreestablecer = true;
                    this.ocultr = false;
                    this.username = ''; 
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Correo de recuperacion enviado.', life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario Incorrecto', life: 3000 });
                }
            });
        } else if (this.contrasena?.trim() && this.codigo.trim()) {
            this.usuarioService.Reestablecer(this.codigo, this.contrasena).then(response => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Contraseña reestablecida.', life: 3000 });

                    const dataa = response.data;
                    console.log(dataa);
    
                    this.router.navigate(['/login']);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos Incorrectos', life: 3000 });
                }
            });
        }
    }
    
}
