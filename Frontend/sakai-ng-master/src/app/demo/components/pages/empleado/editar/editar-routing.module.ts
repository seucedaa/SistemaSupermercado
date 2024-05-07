import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarComponent } from './editar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarComponent },
		{ path: 'empleado', loadChildren: () => import('../empleado.module').then(m => m.EmpleadoModule) },

	])],
	exports: [RouterModule]
})
export class EditarRoutingModule { }
