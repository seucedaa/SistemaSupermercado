import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarComponent } from './editar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarComponent },
		{ path: 'producto', loadChildren: () => import('../producto.module').then(m => m.ProductoModule) },

	])],
	exports: [RouterModule]
})
export class EditarRoutingModule { }
