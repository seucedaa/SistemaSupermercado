import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { LayoutService } from './service/app.layout.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = []

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Inicio',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home/'],
          },
        ],
      },
      {
        label: 'Reportes',
        items: [
          {
            label: 'Stock',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/home/reports/stock'],
          },
        ],
      },
      // {
      //     label: 'UI Components',
      //     items: [
      //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
      //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
      //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
      //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
      //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
      //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
      //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
      //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
      //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
      //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
      //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
      //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
      //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
      //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
      //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
      //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
      //     ]
      // },
      // {
      //     label: 'Prime Blocks',
      //     items: [
      //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
      //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
      //     ]
      // },
      // {
      //     label: 'Utilities',
      //     items: [
      //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
      //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
      //     ]
      // },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          // {
          //     label: 'Landing',
          //     icon: 'pi pi-fw pi-globe',
          //     routerLink: ['/landing']
          // },
          // {
          //     label: 'Auth',
          //     icon: 'pi pi-fw pi-user',
          //     items: [
          //         {
          //             label: 'Login',
          //             icon: 'pi pi-fw pi-sign-in',
          //             routerLink: ['/auth/login']
          //         },
          //         {
          //             label: 'Error',
          //             icon: 'pi pi-fw pi-times-circle',
          //             routerLink: ['/auth/error']
          //         },
          //         {
          //             label: 'Access Denied',
          //             icon: 'pi pi-fw pi-lock',
          //             routerLink: ['/auth/access']
          //         }
          //     ]
          // },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/home/pages/crud'],
          },
          {
            label: 'Comprar',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['/home/pages/comprar'],
          },
          {
            label: 'Estadisticas',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Productos',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/home/pages/estadisticas'],
              },
              {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/home/pages/usuario'],
              },
            ],
          },
          {
            label: 'Acceso',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Roles',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/home/pages/rol'],
              },
              {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/home/pages/usuario'],
              },
            ],
          },
          {
            label: 'General',
            icon: 'pi pi-fw pi-globe',
            items: [
              {
                label: 'Cargos',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/home/pages/cargo'],
              },
              {
                label: 'Categorias',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: ['/home/pages/categoria'],
              },
              {
                label: 'Departamentos',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: ['/home/pages/departamento'],
              },
              {
                label: 'Estados Civiles',
                icon: 'pi pi-fw pi-heart',
                routerLink: ['/home/pages/estadocivil'],
              },
              {
                label: 'Impuestos',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: ['/home/pages/impuesto'],
              },
              {
                label: 'Municipios',
                icon: 'pi pi-fw pi-building',
                routerLink: ['/home/pages/municipio'],
              },
              {
                label: 'Sub Categorias',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/home/pages/subcategoria'],
              },
            ],
          },
          {
            label: 'Supermercado',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
              {
                label: 'Empleados',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/home/pages/empleado'],
              },
              {
                label: 'Lotes',
                icon: 'pi pi-fw pi-inbox',
                routerLink: ['/home/pages/lote'],
              },
              {
                label: 'Productos',
                icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/home/pages/producto'],
              },
              {
                label: 'Promociones',
                icon: 'pi pi-fw pi-percentage',
                routerLink: ['/home/pages/promocion'],
              },
              {
                label: 'Proveedores',
                icon: 'pi pi-fw pi-truck',
                routerLink: ['/home/pages/proveedor'],
              },
              {
                label: 'Sucursales',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/home/pages/sucursal'],
              },
            ],
          },
          {
            label: 'Ventas',
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Clientes',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/home/pages/cliente'],
              },
            ],
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
            routerLink: ['/home/pages/empty'],
          },
        ],
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
    ]
  }
}
