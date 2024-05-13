import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'rol', loadChildren: () => import('../rol.module').then(m => m.RolModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
