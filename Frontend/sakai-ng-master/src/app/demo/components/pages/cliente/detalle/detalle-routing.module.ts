import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'cliente', loadChildren: () => import('../cliente.module').then(m => m.ClienteModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
