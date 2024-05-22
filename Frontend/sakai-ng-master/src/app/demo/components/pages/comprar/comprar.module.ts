import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComprarRoutingModule } from './comprar-routing.module'
import { ComprarComponent } from './comprar.component'
import { CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
// extras
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';

@NgModule({
  imports: [
    CommonModule,
    ComprarRoutingModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    DataViewModule,
    FormsModule,
    PickListModule,
    OrderListModule,
    InputTextModule,
    DropdownModule,
    RatingModule
  ],
  declarations: [ComprarComponent],
})
export class ComprarModule {}
