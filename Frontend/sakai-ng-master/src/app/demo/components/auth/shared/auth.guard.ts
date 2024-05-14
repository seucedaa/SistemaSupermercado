import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/demo/service/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:UsuarioService, private route: Router){

  }
    canActivate(){
      if(this.service.EstaLogueado()){
        return true;
      }else {
        this.route.navigate(["login"])
        return false;
      }
    }
  
}
