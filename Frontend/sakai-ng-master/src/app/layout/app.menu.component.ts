import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../demo/service/rol.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    permisosPermitidos: Set<string> = new Set();
    prueba: boolean = false;

    constructor(private servicioLogin: ServiceService,public layoutService: LayoutService,private cookieService: CookieService) { }

    // ngOnInit() {
    //     this.model = [
    //         {
    //             label: 'Inicio',
    //             items: [
    //                 { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/'] },
                    
    //             ]
    //         },
            
    //         {
    //             label: 'Reportes',
    //             items:[
    //                 {
    //                     label: 'Reportes',
    //                     icon: 'pi pi-file-pdf',
    //                     items:[
    //                         {
    //                             label: 'Inventario',
    //                             icon: 'pi pi-truck',
    //                             routerLink: ['/home/reports/stock']
    //                         },
    //                         {
    //                             label: 'Productos Vendidos',
    //                             icon: 'pi pi-shopping-cart',
    //                             routerLink: ['/home/reports/pvendidos']
    //                         },
    //                         {
    //                             label: 'Clientes',
    //                             icon: 'pi pi-user',
    //                             routerLink: ['/home/reports/clientess']
    //                         },
    //                         {
    //                             label: 'Clientes con Promocion',
    //                             icon: 'pi pi-percentage',
    //                             routerLink: ['/home/reports/cpromocion']
    //                         },
    //                         {
    //                             label: 'Ventas',
    //                             icon: 'pi pi-shopping-cart',
    //                             routerLink: ['/home/reports/ventas']
    //                         }
    //                     ]
    //                 },
    //             ]
    //         },
    //         {
    //             label: 'Estadisticas',
    //             items:[
    //                 {label: 'Estadisticas', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/estadisticas']}
    //             ]
    //         },
            
    //         {
    //             label: 'Pages',

    //             icon: 'pi pi-fw pi-briefcase',
    //             items: [
    //               {
    //                 label: 'Comprar',
    //                 icon: 'pi pi-fw pi-shopping-cart',
    //                 routerLink: ['/home/pages/comprar'],
    //               },
                       
    //                 {
    //                     label: 'Acceso',
    //                     icon: 'pi pi-fw pi-user',
    //                     items:[
    //                         {
    //                             label: 'Roles',
    //                             icon: 'pi pi-fw pi-cog',
    //                             routerLink: ['/home/acceso/rol']
    //                         },
    //                         {
    //                             label: 'Usuarios',
    //                             icon: 'pi pi-fw pi-user',
    //                             routerLink: ['/home/pages/usuario']
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     label: 'General',
    //                     icon: 'pi pi-fw pi-globe',
    //                     items:[
    //                         {
    //                             label: 'Cargos',
    //                             icon: 'pi pi-fw pi-briefcase',
    //                             routerLink: ['/home/pages/cargo']
    //                         },
    //                         {
    //                             label: 'Categorias',
    //                             icon: 'pi pi-fw pi-sitemap',
    //                             routerLink: ['/home/pages/categoria']
    //                         },
    //                         {
    //                             label: 'Departamentos',
    //                             icon: 'pi pi-fw pi-map-marker',
    //                             routerLink: ['/home/pages/departamento']
    //                         },
    //                         {
    //                             label: 'Estados Civiles',
    //                             icon: 'pi pi-fw pi-heart',
    //                             routerLink: ['/home/pages/estadocivil']
    //                         }
    //                         ,
    //                         {
    //                             label: 'Impuestos',
    //                             icon: 'pi pi-fw pi-money-bill',
    //                             routerLink: ['/home/pages/impuesto']
    //                         },
    //                         {
    //                             label: 'Municipios',
    //                             icon: 'pi pi-fw pi-building',
    //                             routerLink: ['/home/pages/municipio']
    //                         }
    //                         ,
    //                         {
    //                             label: 'Sub Categorias',
    //                             icon: 'pi pi-fw pi-th-large',
    //                             routerLink: ['/home/pages/subcategoria']
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Supermercado',
    //                     icon: 'pi pi-fw pi-shopping-cart',
    //                     items:[
    //                         {
    //                             label: 'Empleados',
    //                             icon: 'pi pi-fw pi-users',
    //                             routerLink: ['/home/pages/empleado']
    //                         },
    //                         {
    //                             label: 'Lotes',
    //                             icon: 'pi pi-fw pi-inbox',
    //                             routerLink: ['/home/pages/lote']
    //                         },
    //                         {
    //                             label: 'Productos',
    //                             icon: 'pi pi-fw pi-shopping-bag',
    //                             routerLink: ['/home/pages/producto']
    //                         },
    //                         {
    //                             label: 'Promociones',
    //                             icon: 'pi pi-fw pi-percentage',
    //                             routerLink: ['/home/pages/promocion']
    //                         },
    //                         {
    //                             label: 'Proveedores',
    //                             icon: 'pi pi-fw pi-truck',
    //                             routerLink: ['/home/pages/proveedor']
    //                         },
    //                         {
    //                             label: 'Sucursales',
    //                             icon: 'pi pi-fw pi-home',
    //                             routerLink: ['/home/pages/sucursal']
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Ventas',
    //                     icon: 'pi pi-fw pi-dollar',
    //                     items:[
    //                         {
    //                             label: 'Clientes',
    //                             icon: 'pi pi-fw pi-user-plus',
    //                             routerLink: ['/home/pages/cliente']
    //                         }
    //                     ]
    //                 },

    //             ]
    //         },
            
    //     ];
    // }


    ngOnInit() {
        const admin = this.cookieService.get('esAdmin').toString()
        console.log("AVEER")
        console.log(admin)
        if (admin != "true")
        {
            console.log("Ento AQUII LOCOOOOO")
            const roleId = Number.parseInt(this.cookieService.get('roleID'));

            this.servicioLogin.getPantallasDeRol(roleId).subscribe(pantallasPermitidas => {
                console.log('ENTRO?')
                const nombresPermitidos = new Set(pantallasPermitidas.map(pant => pant.panta_Descripcion.toLowerCase().trim()));
                console.log('Los NOMBRES SON')
                console.log(nombresPermitidos)
                const filtrarSubitems = (subitems) => {
                    return subitems.filter(opcion => {
                        const nombreLowerCase = opcion.label.toLowerCase().trim();
                        return nombresPermitidos.has(nombreLowerCase);
                    });
                };

                this.model = this.menuCompleto
                    .map(section => {
                        const itemsFiltrados = section.items.map(subSection => {
                            const subItemsFiltrados = filtrarSubitems(subSection.items || []);
                            return {
                                ...subSection,
                                items: subItemsFiltrados
                            };
                        }).filter(subSection => subSection.items.length > 0);

                        return {
                            ...section,
                            items: itemsFiltrados
                        };
                    })
                    .filter(section => section.items.length > 0);
            });


        }
        else
        {
            this.model = this.menuCompleto;

        }
        }
    menuCompleto = [
        {
            items: [
                {
                                label: 'Inicio',
                                items: [
                                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/'] },
                                    
                                ]
                            },
                            
                            {
                                label: 'Reportes',
                                items:[
                                    {
                                        label: 'Reportes',
                                        icon: 'pi pi-file-pdf',
                                        items:[
                                            {
                                                label: 'Inventario',
                                                icon: 'pi pi-truck',
                                                routerLink: ['/home/reports/stock']
                                            },
                                            {
                                                label: 'Productos Vendidos',
                                                icon: 'pi pi-shopping-cart',
                                                routerLink: ['/home/reports/pvendidos']
                                            },
                                            {
                                                label: 'Clientes',
                                                icon: 'pi pi-user',
                                                routerLink: ['/home/reports/clientess']
                                            },
                                            {
                                                label: 'Clientes con Promocion',
                                                icon: 'pi pi-percentage',
                                                routerLink: ['/home/reports/cpromocion']
                                            },
                                            {
                                                label: 'Ventas',
                                                icon: 'pi pi-shopping-cart',
                                                routerLink: ['/home/reports/ventas']
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                label: 'Estadisticas',
                                items:[
                                    {label: 'Estadisticas', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/estadisticas']}
                                ]
                            },
                            
                            {
                                label: 'Pages',
                                icon: 'pi pi-fw pi-briefcase',
                                items: [
                                  {
                                    label: 'Comprar',
                                    icon: 'pi pi-fw pi-shopping-cart',
                                    routerLink: ['/home/pages/comprar'],
                                  },
                                       
                                    {
                                        label: 'Acceso',
                                        icon: 'pi pi-fw pi-user',
                                        items:[
                                            {
                                                label: 'Roles',
                                                icon: 'pi pi-fw pi-cog',
                                                routerLink: ['/home/acceso/rol']
                                            },
                                            {
                                                label: 'Usuarios',
                                                icon: 'pi pi-fw pi-user',
                                                routerLink: ['/home/pages/usuario']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'General',
                                        icon: 'pi pi-fw pi-globe',
                                        items:[
                                            {
                                                label: 'Cargos',
                                                icon: 'pi pi-fw pi-briefcase',
                                                routerLink: ['/home/pages/cargo']
                                            },
                                            {
                                                label: 'Categorias',
                                                icon: 'pi pi-fw pi-sitemap',
                                                routerLink: ['/home/pages/categoria']
                                            },
                                            {
                                                label: 'Departamentos',
                                                icon: 'pi pi-fw pi-map-marker',
                                                routerLink: ['/home/pages/departamento']
                                            },
                                            {
                                                label: 'Estados Civiles',
                                                icon: 'pi pi-fw pi-heart',
                                                routerLink: ['/home/pages/estadocivil']
                                            }
                                            ,
                                            {
                                                label: 'Impuestos',
                                                icon: 'pi pi-fw pi-money-bill',
                                                routerLink: ['/home/pages/impuesto']
                                            },
                                            {
                                                label: 'Municipios',
                                                icon: 'pi pi-fw pi-building',
                                                routerLink: ['/home/pages/municipio']
                                            }
                                            ,
                                            {
                                                label: 'Sub Categorias',
                                                icon: 'pi pi-fw pi-th-large',
                                                routerLink: ['/home/pages/subcategoria']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Supermercado',
                                        icon: 'pi pi-fw pi-shopping-cart',
                                        items:[
                                            {
                                                label: 'Empleados',
                                                icon: 'pi pi-fw pi-users',
                                                routerLink: ['/home/pages/empleado']
                                            },
                                            {
                                                label: 'Lotes',
                                                icon: 'pi pi-fw pi-inbox',
                                                routerLink: ['/home/pages/lote']
                                            },
                                            {
                                                label: 'Productos',
                                                icon: 'pi pi-fw pi-shopping-bag',
                                                routerLink: ['/home/pages/producto']
                                            },
                                            {
                                                label: 'Promociones',
                                                icon: 'pi pi-fw pi-percentage',
                                                routerLink: ['/home/pages/promocion']
                                            },
                                            {
                                                label: 'Proveedores',
                                                icon: 'pi pi-fw pi-truck',
                                                routerLink: ['/home/pages/proveedor']
                                            },
                                            {
                                                label: 'Sucursales',
                                                icon: 'pi pi-fw pi-home',
                                                routerLink: ['/home/pages/sucursal']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Ventas',
                                        icon: 'pi pi-fw pi-dollar',
                                        items:[
                                            {
                                                label: 'Clientes',
                                                icon: 'pi pi-fw pi-user-plus',
                                                routerLink: ['/home/pages/cliente']
                                            }
                                        ]
                                    },
                
                                ]
                            },
            ]

        },
    ];
}
