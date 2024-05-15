import { Component, ElementRef, ViewChild } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { LayoutService } from './service/app.layout.service'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent {
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(public layoutService: LayoutService,private messageService: MessageService,private confirmationService: ConfirmationService) {}

  onCartClick() {
    this.layoutService.onCartChange()
  }

  salir(event: Event) {
    this.confirmationService.confirm({
        key: 'salir',
        target: event.target || new EventTarget,
        message: '¿Esta seguro que desea cerrar la sesion?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Listo', detail: 'Sesion cerrada con exito' });
        },
        reject: () => {
        }
    });
}
}
