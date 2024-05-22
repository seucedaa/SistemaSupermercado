import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'proveedor', loadChildren: () => import('../proveedor.module').then(m => m.ProveedorModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
