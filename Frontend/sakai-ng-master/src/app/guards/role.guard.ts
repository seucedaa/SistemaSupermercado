import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../demo/service/rol.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private permisosPermitidos: Set<string> = new Set();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private servicioLogin: ServiceService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const admin = this.cookieService.get('esAdmin');
    console.log('Admin status from cookie:', admin);

    if (admin === "true") {
      console.log('Admin user detected. Access granted.');
      return of(true); 
    }

    const roleId = Number(this.cookieService.get('roleID'));
    console.log('Role ID from cookie:', roleId);

    if (isNaN(roleId)) {
      console.error('Invalid role ID:', roleId);
      this.router.navigate(['/login']); 
      return of(false);
    }

    return this.servicioLogin.getPantallasDeRol(roleId).pipe(
      map(response => {
        console.log('Response from service:', response);

        if (response && response.data && Array.isArray(response.data)) {
          const pantallasPermitidas = response.data.map(pant => pant.panta_Descripcion.toLowerCase().trim());
          this.permisosPermitidos = new Set(pantallasPermitidas);
          console.log('Permitted screens:', this.permisosPermitidos);

          const url = state.url.toLowerCase().trim();
          console.log('Current URL:', url);

          const urlWithoutBase = url.replace(/^\/app\/(uikit|generales|acceso)\//, '').toLowerCase().trim();
          console.log('URL without base:', urlWithoutBase);

          const isAllowed = this.permisosPermitidos.has(urlWithoutBase);
          if (isAllowed) {
            console.log('Access granted to URL:', url);
            return true;
          } else {
            console.warn('Access denied to URL:', url);
            this.router.navigate(['/login']); 
            return false;
          }
        } else {
          console.error('Invalid response structure:', response);
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(error => {
        console.error('Error fetching role screens:', error);
        this.router.navigate(['/login']); 
        return of(false);
      })
    );
  }
}