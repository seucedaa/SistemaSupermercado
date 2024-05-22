import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { ComprarComponent } from "./comprar.component"

@NgModule({
  imports: [RouterModule.forChild([{ path: "", component: ComprarComponent }])],
  exports: [RouterModule],
})
export class ComprarRoutingModule {}
