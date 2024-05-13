import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadisticasComponent } from './estadisticas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadisticasComponent }
	])],
	exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
