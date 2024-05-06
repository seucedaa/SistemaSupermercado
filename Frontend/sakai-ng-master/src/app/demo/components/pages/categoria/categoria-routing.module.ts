import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CategoriaComponent } from './categoria.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CategoriaComponent },
		{ path: 'detalle/:id', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
    ])],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }
