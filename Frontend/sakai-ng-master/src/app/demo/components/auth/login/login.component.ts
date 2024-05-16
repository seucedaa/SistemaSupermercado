import { Component } from '@angular/core';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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
export class LoginComponent {
    public username: string;
    public contrasena: string;
    submitted: boolean = false;


    valCheck: string[] = ['remember'];

    usuario: Usuario = {};


    constructor(public layoutService: LayoutService,  public usuarioService: UsuarioService, public router: Router,  private messageService: MessageService) { 
        localStorage.clear();
    }

    login(){
        this.submitted = true;

        if(this.submitted && this.username?.trim() && this.contrasena?.trim()){
            this.usuarioService.Login(this.username, this.contrasena).then((response => {
                if(response.success){
                    console.log(response);
                    const dataa = response.data;
                    sessionStorage.setItem('usuario', JSON.stringify(dataa[0])); 

                    this.router.navigate(['/home'])
                }else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas', life: 3000 });
                    console.log('credenciales erroneas')
                }
            }));
        }
       
    }
}
