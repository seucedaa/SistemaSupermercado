import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'empleado', loadChildren: () => import('../empleado.module').then(m => m.EmpleadoModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
