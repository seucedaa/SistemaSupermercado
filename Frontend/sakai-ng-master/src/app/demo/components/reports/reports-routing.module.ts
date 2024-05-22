import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard'; 
import { RoleGuard } from 'src/app/guards/role.guard'; 

const routes: Routes = [
    { path: 'stock', data: { breadcrumb: 'stock' }, loadChildren: () => import('./stock/stock.module').then(m => m.StockModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'pvendidos', data: { breadcrumb: 'pvendidos' }, loadChildren: () => import('./pvendidos/pvendidos.module').then(m => m.PvendidosModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'clientess', data: { breadcrumb: 'clientess' }, loadChildren: () => import('./clientess/clientess.module').then(m => m.ClientessModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'ventas', data: { breadcrumb: 'ventas' }, loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'promocion', data: { breadcrumb: 'promocion' }, loadChildren: () => import('./promocion/promocion.module').then(m => m.PromocionModule), canActivate: [AuthGuard, RoleGuard] },
    { path: '**', redirectTo: '/notfound' }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
