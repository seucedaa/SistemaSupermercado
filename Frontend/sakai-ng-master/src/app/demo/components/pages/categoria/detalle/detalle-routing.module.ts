import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'categoria', loadChildren: () => import('../categoria.module').then(m => m.CategoriaModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
