import { Component } from '@angular/core';
import { Usuario } from 'src/app/demo/models/UsuarioViewModel';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: #40a72e !important;
        }
    `]
})
export class LoginComponent {
    public username: string = '';
    public contrasena: string = '';
    submitted: boolean = false;

    valCheck: string[] = ['remember'];

    usuario: Usuario = {};

    constructor(
        public layoutService: LayoutService, 
        public usuarioService: UsuarioService, 
        public router: Router, 
        private messageService: MessageService, 
        private cookieService: CookieService
    ) { 
        localStorage.clear();
    }

    login() {
        this.submitted = true;

        if (this.contrasena?.trim() && this.username?.trim()) {
            this.usuarioService.Login(this.username, this.contrasena).subscribe({
                next: (data) => {
                    if (data.length > 0) {
                        console.log('Login exitoso', data);

                        sessionStorage.setItem('usuario', JSON.stringify(data[0]));

                        this.cookieService.set('roleID', data[0].roles_Id);
                        this.cookieService.set('esAdmin', data[0].usuar_Admin);

                        console.log('Usuario guardado:', data[0])

                        this.router.navigate(['/home']);
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas', life: 3000 });
                        console.log('Credenciales incorrectas');
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error de conexión o del servidor', life: 3000 });
                    console.error('Error en el login:', error);
                }
            });
        }
    }
}
