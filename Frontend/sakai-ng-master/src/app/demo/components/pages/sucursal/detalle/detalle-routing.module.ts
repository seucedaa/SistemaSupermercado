import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'sucursal', loadChildren: () => import('../sucursal.module').then(m => m.SucursalModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
