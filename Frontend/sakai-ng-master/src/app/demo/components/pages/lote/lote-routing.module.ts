import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoteComponent } from './lote.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LoteComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },

	])],
	exports: [RouterModule]
})
export class LoteRoutingModule { }
export { LoteComponent };

