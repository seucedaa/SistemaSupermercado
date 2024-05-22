import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PromocionComponent } from './promocion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PromocionComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },

	])],
	exports: [RouterModule]
})
export class PromocionRoutingModule { }
export { PromocionComponent };

