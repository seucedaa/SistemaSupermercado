import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'cargo', loadChildren: () => import('../cargo.module').then(m => m.CargoModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
