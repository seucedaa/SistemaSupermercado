import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipioComponent } from './municipio.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MunicipioComponent }
	])],
	exports: [RouterModule]
})
export class MunicipioRoutingModule { }
export { MunicipioComponent };

