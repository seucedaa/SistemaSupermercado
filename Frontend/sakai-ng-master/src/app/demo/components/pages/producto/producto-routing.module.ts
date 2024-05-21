import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductoComponent },
		//{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) },
		{ path: 'editar/:id', loadChildren: () => import('./editar/editar.module').then(m => m.EditarModule) },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) }
	])],
	exports: [RouterModule]
})
export class ProductoRoutingModule { }
export { ProductoComponent };

