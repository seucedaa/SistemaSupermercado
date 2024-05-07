import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmpleadoComponent },
		{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) },
		{ path: 'editar/:id', loadChildren: () => import('./editar/editar.module').then(m => m.EditarModule) },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) }
	])],
	exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
export { EmpleadoComponent };

