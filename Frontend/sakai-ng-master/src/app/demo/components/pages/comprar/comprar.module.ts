import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComprarRoutingModule } from './comprar-routing.module'
import { ComprarComponent } from './comprar.component'
import { CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'

@NgModule({
  imports: [
    CommonModule,
    ComprarRoutingModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
  ],
  declarations: [ComprarComponent],
})
export class ComprarModule {}
