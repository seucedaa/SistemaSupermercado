import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'sucursal', loadChildren: () => import('../sucursal.module').then(m => m.SucursalModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
