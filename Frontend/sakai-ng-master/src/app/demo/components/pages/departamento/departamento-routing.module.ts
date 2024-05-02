import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentoComponent } from './departamento.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DepartamentoComponent }
	])],
	exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
