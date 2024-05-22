import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarComponent } from './editar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarComponent },
		{ path: 'proveedor', loadChildren: () => import('../proveedor.module').then(m => m.ProveedorModule) },

	])],
	exports: [RouterModule]
})
export class EditarRoutingModule { }
