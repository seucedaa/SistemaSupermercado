import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../demo/service/rol.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    permisosPermitidos: Set<string> = new Set();
    prueba: boolean = false;

    constructor(private servicioLogin: ServiceService,public layoutService: LayoutService,private cookieService: CookieService, private router: Router) { }

    ngOnInit() {
        const admin = this.cookieService.get('esAdmin').toString();
        console.log("Admin status from cookie:", admin);
    
        if (admin !== "true") {
          this.loadUserRoleMenu();
        } else {
          console.log('Admin user detected. Loading full menu.');
          this.model = this.menuCompleto; // Admin gets the full menu
          console.log('Admin full menu model:', this.model);
        }
      }
    
      loadUserRoleMenu() {
        const roleId = Number(this.cookieService.get('roleID'));
        console.log("Role ID from cookie:", roleId);
    
        if (isNaN(roleId)) {
          console.error('Invalid role ID:', roleId);
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si el rol no es válido
          return;
        }
    
        this.servicioLogin.getPantallasDeRol(roleId).subscribe({
          next: (response) => this.handleRoleScreensResponse(response),
          error: (err) => {
            console.error('Error fetching role screens:', err);
            this.router.navigate(['/login']); // Redirige a la página de inicio de sesión en caso de error
          }
        });
      }
    
      handleRoleScreensResponse(response: any) {
        console.log('Response from service:', response);
    
        if (response && response.data && Array.isArray(response.data)) {
          const pantallasPermitidas = response.data.map(pant => pant.panta_Descripcion.toLowerCase().trim());
          console.log('Permitted screen names:', pantallasPermitidas);
    
          const nombresPermitidos = new Set(pantallasPermitidas);
          console.log('Nombres permitidos:', nombresPermitidos);
    
          const filtrarSubitems = (subitems) => subitems.filter(opcion => {
            const validLabel = nombresPermitidos.has(opcion.label.toLowerCase().trim());
            const validUrl = this.validateUrl(opcion.routerLink[0]);
            console.log(`Validating option: ${opcion.label}, URL: ${opcion.routerLink}, validLabel: ${validLabel}, isValid: ${validUrl}`);
            return validLabel && validUrl;
          });
    
          this.model = this.menuCompleto.map(section => {
            const itemsFiltrados = section.items.map(subSection => ({
              ...subSection,
              items: filtrarSubitems(subSection.items || [])
            })).filter(subSection => subSection.items && subSection.items.length > 0);
    
            return { ...section, items: itemsFiltrados };
          }).filter(section => section.items && section.items.length > 0);
    
          console.log('Filtered menu model:', this.model);
        } else {
          console.error('Invalid response structure:', response);
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si la estructura de la respuesta no es válida
        }
      }
    
      validateUrl(url: string): boolean {
        if (typeof url !== 'string') {
          console.warn('Invalid URL:', url);
          return false;
        }
    
        const cleanedUrl = url.startsWith('/') ? url.substring(1) : url;
        console.log(`Cleaning URL: ${url} -> ${cleanedUrl}`);
    
        const routes = this.router.config;
        console.log('Router Config:', routes);
    
        const checkRoutes = (routes: any[], path: string): boolean => {
          for (const route of routes) {
            if (route.path === path) {
              console.log(`Route matched: ${route.path}`);
              return true;
            }
            if (route.children) {
              const isChildMatch = checkRoutes(route.children, path);
              console.log(`Checking children routes for path: ${path} - Result: ${isChildMatch}`);
              if (isChildMatch) {
                return true;
              }
            }
          }
          return false;
        };
    
        const isValid = checkRoutes(routes, cleanedUrl);
        console.log(`URL validation result for ${url}: ${isValid}`);
        return isValid;
      }
    
      onMenuItemClick(routerLink: string) {
        this.router.navigate([routerLink]);
      }
    
    menuCompleto = [
        {
            items: [
                {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home', routerLink: ['/home/']
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-file-pdf',
                    items: [
                        { label: 'Inventario', icon: 'pi pi-truck', routerLink: '/home/reports/stock', command: (event) => this.onMenuItemClick('/home/reports/stock') },
                        { label: 'Productos Vendidos', icon: 'pi pi-shopping-cart', routerLink: '/home/reports/pvendidos', command: (event) => this.onMenuItemClick('/home/reports/pvendidos') },
                        { label: 'Clientes', icon: 'pi pi-user', routerLink: '/home/reports/clientess', command: (event) => this.onMenuItemClick('/home/reports/clientess') },
                        { label: 'Clientes con Promocion', icon: 'pi pi-percentage', routerLink: '/home/reports/promocion', command: (event) => this.onMenuItemClick('/home/reports/promocion') },
                        { label: 'Ventas', icon: 'pi pi-shopping-cart', routerLink: '/home/reports/ventas', command: (event) => this.onMenuItemClick('/home/reports/ventas') }
                    ]

                },
                {
                    label: 'Estadisticas',
                    icon: 'pi pi-chart-bar',
                    items: [
                        { label: 'Estadisticas', icon: 'pi pi-fw pi-chart-line', routerLink: '/home/estadisticas', command: (event) => this.onMenuItemClick('/home/estadisticas') }
                    ]
                },

                    {
                        label: 'Comprar',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['/home/pages/comprar'],
                        command: (event) => this.onMenuItemClick('/home/pages/comprar')
                    },
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            { label: 'Roles', icon: 'pi pi-fw pi-cog', routerLink: '/home/acceso/roles', command: (event) => this.onMenuItemClick('/home/acceso/roles') },
                            { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: '/home/pages/usuarios', command: (event) => this.onMenuItemClick('/home/pages/usuarios') }
                        ]
                    },
                    {
                        label: 'General',
                        icon: 'pi pi-fw pi-globe',
                        items: [
                            { label: 'Cargos', icon: 'pi pi-fw pi-briefcase', routerLink: '/home/pages/cargo', command: (event) => this.onMenuItemClick('/home/pages/cargo') },
                            { label: 'Categorias', icon: 'pi pi-fw pi-sitemap', routerLink: '/home/pages/categoria', command: (event) => this.onMenuItemClick('/home/pages/categorias') },
                            { label: 'Departamentos', icon: 'pi pi-fw pi-map-marker', routerLink: '/home/pages/departamentos', command: (event) => this.onMenuItemClick('/home/pages/departamentos') },
                            { label: 'Estados Civiles', icon: 'pi pi-fw pi-heart', routerLink: '/home/pages/estadocivil', command: (event) => this.onMenuItemClick('/home/pages/estadocivil') },
                            { label: 'Impuestos', icon: 'pi pi-fw pi-money-bill', routerLink: '/home/pages/impuestos', command: (event) => this.onMenuItemClick('/home/pages/impuestos') },
                            { label: 'Municipios', icon: 'pi pi-fw pi-building', routerLink: '/home/pages/municipio', command: (event) => this.onMenuItemClick('/home/pages/municipio') },
                            { label: 'Sub Categorias', icon: 'pi pi-fw pi-th-large', routerLink: '/home/pages/subcategoria', command: (event) => this.onMenuItemClick('/home/pages/subcategoria') }
                        ]
                    },
                    {
                        label: 'Supermercado',
                        icon: 'pi pi-fw pi-shopping-cart',
                        items: [
                            { label: 'Empleados', icon: 'pi pi-fw pi-users', routerLink: '/home/pages/empleado', command: (event) => this.onMenuItemClick('/home/pages/empleado') },
                            { label: 'Lotes', icon: 'pi pi-fw pi-inbox', routerLink: '/home/pages/lote', command: (event) => this.onMenuItemClick('/home/pages/lote') },
                            { label: 'Productos', icon: 'pi pi-fw pi-shopping-bag', routerLink: '/home/pages/producto', command: (event) => this.onMenuItemClick('/home/pages/producto') },
                            { label: 'Promociones', icon: 'pi pi-fw pi-percentage', routerLink: '/home/pages/promocion', command: (event) => this.onMenuItemClick('/home/pages/promocion') },
                            { label: 'Proveedores', icon: 'pi pi-fw pi-truck', routerLink: '/home/pages/proveedor', command: (event) => this.onMenuItemClick('/home/pages/proveedor') },
                            { label: 'Sucursales', icon: 'pi pi-fw pi-home', routerLink: '/home/pages/sucursal', command: (event) => this.onMenuItemClick('/home/pages/sucursal') }
                        ]
                    },
                    {
                        label: 'Ventas',
                        icon: 'pi pi-fw pi-dollar',
                        items: [
                            { label: 'Clientes', icon: 'pi pi-fw pi-user-plus', routerLink: '/home/pages/clientes', command: (event) => this.onMenuItemClick('/home/pages/clientes') }
                        ]
                    },

            ]
        },
    ];
}
