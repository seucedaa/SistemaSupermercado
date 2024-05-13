import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DetalleComponent } from './detalle.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DetalleComponent },
      {
        path: 'producto',
        loadChildren: () =>
          import('../producto.module').then((m) => m.ProductoModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DetalleRoutingModule {}
