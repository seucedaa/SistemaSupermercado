import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubcategoriaComponent } from './subcategoria.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SubcategoriaComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },

	])],
	exports: [RouterModule]
})
export class SubcategoriaRoutingModule { }
export { SubcategoriaComponent };

