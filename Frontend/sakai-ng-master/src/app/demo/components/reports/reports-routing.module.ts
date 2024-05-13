import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'stock', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },
        { path: 'pvendidos', loadChildren: () => import('./pvendidos/pvendidos.module').then(m => m.PvendidosModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
