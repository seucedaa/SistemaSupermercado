import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductoComponent },
		{ path: 'editar/:id', loadChildren: () => import('./editar/editar.module').then(m => m.EditarModule) },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
		{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) }

	])],
	exports: [RouterModule]
})
export class ProductoRoutingModule { }
export { ProductoComponent };

