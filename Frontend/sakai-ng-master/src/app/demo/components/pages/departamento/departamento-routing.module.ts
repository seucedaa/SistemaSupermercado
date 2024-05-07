import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentoComponent } from './departamento.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DepartamentoComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
	])],
	exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
