import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/demo/components/notfound/notfound.component';
import { AuthGuard } from 'src/app/guards/auth.guard'; // Ajusta la ruta según sea necesario
import { RoleGuard } from 'src/app/guards/role.guard'; // Ajusta la ruta según sea necesario

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
    data: { breadcrumb: 'Usuarios' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'cargo',
    loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule),
    data: { breadcrumb: 'Cargo' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule),
    data: { breadcrumb: 'Categoria' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'departamentos',
    loadChildren: () => import('./departamento/departamento.module').then(m => m.DepartamentoModule),
    data: { breadcrumb: 'Departamentos' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'estadocivil',
    loadChildren: () => import('./estadocivil/estadocivil.module').then(m => m.EstadoCivilModule),
    data: { breadcrumb: 'Estado Civil' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'impuestos',
    loadChildren: () => import('./impuesto/impuesto.module').then(m => m.ImpuestoModule),
    data: { breadcrumb: 'Impuestos' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule),
    data: { breadcrumb: 'Municipio' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'subcategoria',
    loadChildren: () => import('./subcategoria/subcategoria.module').then(m => m.SubcategoriaModule),
    data: { breadcrumb: 'SubCategoria' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
    data: { breadcrumb: 'empleado' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'lote',
    loadChildren: () => import('./lote/lote.module').then(m => m.LoteModule),
    data: { breadcrumb: 'lote' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule),
    data: { breadcrumb: 'producto' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'promocion',
    loadChildren: () => import('./promocion/promocion.module').then(m => m.PromocionModule),
    data: { breadcrumb: 'promocion' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'proveedor',
    loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
    data: { breadcrumb: 'proveedor' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'sucursal',
    loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule),
    data: { breadcrumb: 'sucursal' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
    data: { breadcrumb: 'clientes' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'timeline',
    loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule),
    data: { breadcrumb: 'timeline' },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'Comprar',
    loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarModule),
    data: { breadcrumb: 'Comprar' },
    canActivate: [AuthGuard, RoleGuard]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
