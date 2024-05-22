import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'subcategoria', loadChildren: () => import('../subcategoria.module').then(m => m.SubcategoriaModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
