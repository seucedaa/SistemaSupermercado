import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        data: { screen: 'Usuarios' },
      },
      {
        path: 'cargo',
        loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule),
        data: { screen: 'Cargo' },
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule),
        data: { screen: 'Categoria' },
      },
      {
        path: 'departamento',
        loadChildren: () => import('./departamento/departamento.module').then(m => m.DepartamentoModule),
        data: { screen: 'Departamento' },
      },
      {
        path: 'estadocivil',
        loadChildren: () => import('./estadocivil/estadocivil.module').then(m => m.EstadoCivilModule),
        data: { screen: 'Estado Civil' },
      },
      {
        path: 'impuesto',
        loadChildren: () => import('./impuesto/impuesto.module').then(m => m.ImpuestoModule),
        data: { screen: 'Impuesto' },
      },
      {
        path: 'municipio',
        loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule),
        data: { screen: 'Municipio' },
      },
      {
        path: 'subcategoria',
        loadChildren: () => import('./subcategoria/subcategoria.module').then(m => m.SubcategoriaModule),
        data: { screen: 'SubCategoria' },
      },
      {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
      },
      {
        path: 'lote',
        loadChildren: () => import('./lote/lote.module').then(m => m.LoteModule),
      },
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule),
      },
      {
        path: 'promocion',
        loadChildren: () => import('./promocion/promocion.module').then(m => m.PromocionModule),
      },
      {
        path: 'proveedor',
        loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
      },
      {
        path: 'sucursal',
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule),
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'timeline',
        loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule),
      },
      {
        path: 'comprar',
        loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarModule),
      },
      { path: '**', redirectTo: '/notfound' },
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
