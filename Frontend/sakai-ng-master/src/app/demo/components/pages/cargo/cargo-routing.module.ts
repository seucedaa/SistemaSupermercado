import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargoComponent } from './cargo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargoComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
	])],
	exports: [RouterModule]
})
export class CargoRoutingModule { }
