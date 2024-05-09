import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { ChartModule } from 'primeng/chart'
import { EstadisticasComponent } from './estadisticas.component';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		EstadisticasRoutingModule,
		ChartModule,
		CalendarModule,
		DropdownModule
	],
	declarations: [EstadisticasComponent]
})
export class EstadisticasModule { }
