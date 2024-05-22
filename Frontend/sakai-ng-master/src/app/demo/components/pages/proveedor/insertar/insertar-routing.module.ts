import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'proveedor', loadChildren: () => import('../proveedor.module').then(m => m.ProveedorModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
