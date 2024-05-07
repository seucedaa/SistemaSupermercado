import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'empleado', loadChildren: () => import('../empleado.module').then(m => m.EmpleadoModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
