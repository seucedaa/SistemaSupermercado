import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private inject: Injector) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authservicio = this.inject.get(UsuarioService);
        let token = req.clone({
            setHeaders: {
                Authorization: 'bearer '+authservicio.GetToken()
            }
        });
        return next.handle(token);
    }
    
}
