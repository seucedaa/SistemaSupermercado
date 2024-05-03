import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'estadisticas', loadChildren: () => import('./estadisticas/estadisticas.module').then(m => m.EstadisticasModule) },
        { path: 'rol', loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
        { path: 'cargo', loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule) },
        { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule) },
        { path: 'departamento', loadChildren: () => import('./departamento/departamento.module').then(m => m.DepartamentoModule) },
        { path: 'estadocivil', loadChildren: () => import('./estadocivil/estadocivil.module').then(m => m.EstadoCivilModule) },
        { path: 'impuesto', loadChildren: () => import('./impuesto/impuesto.module').then(m => m.ImpuestoModule) },
        { path: 'municipio', loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule) },
        { path: 'subcategoria', loadChildren: () => import('./subcategoria/subcategoria.module').then(m => m.SubcategoriaModule) },
        { path: 'empleado', loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule) },
        { path: 'lote', loadChildren: () => import('./lote/lote.module').then(m => m.LoteModule) },
        { path: 'producto', loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule) },
        { path: 'promocion', loadChildren: () => import('./promocion/promocion.module').then(m => m.PromocionModule) },
        { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
        { path: 'sucursal', loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule) },
        { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
