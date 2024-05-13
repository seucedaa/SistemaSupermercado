import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/'] }
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
                                icon: 'pi pi-shopping-cart',
                                routerLink: ['/home/reports/clientes']
                            },
                            {
                                label: 'Clientes con Promocion',
                                icon: 'pi pi-shopping-cart',
                                routerLink: ['/home/reports/cpromocion']
                            },
                            {
                                label: 'Ventas',
                                icon: 'pi pi-shopping-cart',
                                routerLink: ['/home/reports/ventas']
                            },
                            {
                                label: 'Productos',
                                icon: 'pi pi-shopping-cart',
                                routerLink: ['/home/reports/produ']
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
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/home/pages/crud']
                    },
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items:[
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/home/pages/rol']
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
                    // {
                    //     label: 'Timeline',
                    //     icon: 'pi pi-fw pi-calendar',
                    //     routerLink: ['/pages/timeline']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/notfound']
                    // },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/home/pages/empty']
                    },
                ]
            },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
