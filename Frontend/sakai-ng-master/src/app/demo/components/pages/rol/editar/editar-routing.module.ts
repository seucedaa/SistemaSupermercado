import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarComponent } from './editar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarComponent },
		{ path: 'rol', loadChildren: () => import('../rol.module').then(m => m.RolModule) },

	])],
	exports: [RouterModule]
})
export class EditarRoutingModule { }
