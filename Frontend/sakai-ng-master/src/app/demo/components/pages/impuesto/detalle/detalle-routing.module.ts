import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'impuesto', loadChildren: () => import('../impuesto.module').then(m => m.ImpuestoModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
