import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadoCivilComponent } from './estadocivil.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadoCivilComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) }
	])],
	exports: [RouterModule]
})
export class EstadoCivilRoutingModule { }
export { EstadoCivilComponent };

