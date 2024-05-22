import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsuarioComponent },
		{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
		{ path: 'editar/:id', loadChildren: () => import('./editar/editar.module').then(m => m.EditarModule) }

	])],
	exports: [RouterModule]
})
export class UsuarioRoutingModule { }
export { UsuarioComponent };

