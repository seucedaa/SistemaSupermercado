import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard'; // Ajusta la ruta según sea necesario
import { RoleGuard } from 'src/app/guards/role.guard'; // Ajusta la ruta según sea necesario

const routes: Routes =[
    { 
        path: '', component: LoginComponent 
    },
    {
        path: 'home', component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule), canActivate: [RoleGuard] },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [RoleGuard] },
            { path: 'reports', loadChildren: () => import('./demo/components/reports/reports.module').then(m => m.ReportsModule) },
            { path: 'estadisticas', loadChildren: () => import('./demo/components/estadisticas/estadisticas.module').then(m => m.EstadisticasModule),canActivate: [RoleGuard] },
            { path: 'acceso', loadChildren: () => import('./demo/components/acceso/acesso.module').then(m => m.AccesoModule),canActivate: [RoleGuard] },
        ]
    },
    {path: '', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },

] 
@NgModule({
    imports: [RouterModule.forRoot(routes,
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
    )], 
    exports: [RouterModule]
})
export class AppRoutingModule {
}
