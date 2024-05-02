import { Component } from '@angular/core';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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


    valCheck: string[] = ['remember'];

    password!: string;

    usuario: Usuario[] = [];


    constructor(public layoutService: LayoutService, public usuarioService: UsuarioService, public router: Router) { }

    login(){
        this.usuarioService.Login(this.username, this.contrasena).then((response => {
            if(response.success){
                this.router.navigate(['/'])
            }
        }));
    }
}
