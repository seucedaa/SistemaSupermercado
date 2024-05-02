import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoteComponent } from './lote.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LoteComponent }
	])],
	exports: [RouterModule]
})
export class LoteRoutingModule { }
export { LoteComponent };

