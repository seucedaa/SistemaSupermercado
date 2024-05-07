import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolComponent } from './rol.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RolComponent },
		{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) },
	])],
	exports: [RouterModule]
})
export class RolRoutingModule { }
