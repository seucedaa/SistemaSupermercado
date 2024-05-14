import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AuthGuard } from './demo/components/auth/shared/auth.guard';
import { RoleGuard } from './demo/components/auth/shared/role.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { 
                path: '', component: LoginComponent 
            },
            {
                path: 'home', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'reports', loadChildren: () => import('./demo/components/reports/reports.module').then(m => m.ReportsModule) },
                    { path: 'estadisticas', loadChildren: () => import('./demo/components/estadisticas/estadisticas.module').then(m => m.EstadisticasModule) }
                ], canActivate:[RoleGuard]
            },
            {path: '', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
