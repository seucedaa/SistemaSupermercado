import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'producto', loadChildren: () => import('../producto.module').then(m => m.ProductoModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
