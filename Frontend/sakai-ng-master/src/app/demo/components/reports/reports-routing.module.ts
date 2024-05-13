import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'stock', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },
        { path: 'pvendidos', loadChildren: () => import('./pvendidos/pvendidos.module').then(m => m.PvendidosModule) },
        { path: 'clientess', loadChildren: () => import('./clientess/clientess.module').then(m => m.ClientessModule) },
        { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
