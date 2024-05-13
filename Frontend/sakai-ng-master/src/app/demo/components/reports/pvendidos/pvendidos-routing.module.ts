import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PvendidosComponent } from './pvendidos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PvendidosComponent }
	])],
	exports: [RouterModule]
})
export class PvendidosRoutingModule { }