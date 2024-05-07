import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'municipio', loadChildren: () => import('../municipio.module').then(m => m.MunicipioModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
