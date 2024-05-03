import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { ChartModule } from 'primeng/chart'
import { EstadisticasComponent } from './estadisticas.component';

@NgModule({
	imports: [
		CommonModule,
		EstadisticasRoutingModule,
		ChartModule
	],
	declarations: [EstadisticasComponent]
})
export class EstadisticasModule { }
