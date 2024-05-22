import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DetalleComponent },
		{ path: 'usuario', loadChildren: () => import('../usuario.module').then(m => m.UsuarioModule) }
	])],
	exports: [RouterModule]
})
export class DetalleRoutingModule { }
