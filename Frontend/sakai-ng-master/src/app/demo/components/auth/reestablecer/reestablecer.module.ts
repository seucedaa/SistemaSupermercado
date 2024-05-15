import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReestablecerRoutingModule } from './reestablecer-routing.module';
import { ReestablecerComponent } from './reestablecer.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        ReestablecerRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule
    ],
    declarations: [ReestablecerComponent]
})
export class ReestablecerModule { }
