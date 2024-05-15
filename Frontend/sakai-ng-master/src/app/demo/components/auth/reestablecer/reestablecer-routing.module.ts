import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReestablecerComponent } from './reestablecer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReestablecerComponent }
    ])],
    exports: [RouterModule]
})
export class ReestablecerRoutingModule { }
