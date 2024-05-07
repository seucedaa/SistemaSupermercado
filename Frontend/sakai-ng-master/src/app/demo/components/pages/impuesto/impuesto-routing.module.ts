import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpuestoComponent } from './impuesto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ImpuestoComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },

	])],
	exports: [RouterModule]
})
export class ImpuestoRoutingModule { }
