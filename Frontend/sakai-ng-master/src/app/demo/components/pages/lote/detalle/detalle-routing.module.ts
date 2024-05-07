import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'lote', loadChildren: () => import('../lote.module').then(m => m.LoteModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
