import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 constructor(private service: UsuarioService, private route:Router){}
 
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const screen = (route.data as { screen: string }).screen || ''; 
  if (this.service.TieneAcceso(screen)) {
    return true;
  } else {
    this.route.navigate(['']);
    return false;
  }
}
  
}
