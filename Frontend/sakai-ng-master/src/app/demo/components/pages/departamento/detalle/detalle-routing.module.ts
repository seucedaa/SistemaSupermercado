import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'departamento', loadChildren: () => import('../departamento.module').then(m => m.DepartamentoModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
