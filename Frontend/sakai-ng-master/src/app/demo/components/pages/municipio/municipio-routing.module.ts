import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipioComponent } from './municipio.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MunicipioComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },

	])],
	exports: [RouterModule]
})
export class MunicipioRoutingModule { }
export { MunicipioComponent };

