import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'rol', loadChildren: () => import('../rol.module').then(m => m.RolModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
