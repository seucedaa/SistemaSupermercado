import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientessComponent } from './clientess.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientessComponent }
	])],
	exports: [RouterModule]
})
export class ClientessRoutingModule { }