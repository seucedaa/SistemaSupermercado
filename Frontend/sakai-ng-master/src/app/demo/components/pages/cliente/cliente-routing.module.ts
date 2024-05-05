import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClienteComponent },
		{ path: 'insertar', loadChildren: () => import('./insertar/insertar.module').then(m => m.InsertarModule) },
	])],
	exports: [RouterModule]
})
export class ClienteRoutingModule { }
export { ClienteComponent };

