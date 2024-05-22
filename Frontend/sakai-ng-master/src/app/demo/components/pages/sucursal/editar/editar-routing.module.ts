import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarComponent } from './editar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarComponent },
		{ path: 'sucursal', loadChildren: () => import('../sucursal.module').then(m => m.SucursalModule) },

	])],
	exports: [RouterModule]
})
export class EditarRoutingModule { }
