import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'promocion', loadChildren: () => import('../promocion.module').then(m => m.PromocionModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
