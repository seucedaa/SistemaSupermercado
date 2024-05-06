import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'estadocivil', loadChildren: () => import('../estadocivil.module').then(m => m.EstadoCivilModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
