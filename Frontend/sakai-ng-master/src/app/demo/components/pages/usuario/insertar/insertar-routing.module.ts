import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from './insertar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertarComponent },
		{ path: 'usuario', loadChildren: () => import('../usuario.module').then(m => m.UsuarioModule) }

	])],
	exports: [RouterModule]
})
export class InsertarRoutingModule { }
