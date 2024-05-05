import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'cliente', loadChildren: () => import('../cliente.module').then(m => m.ClienteModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
