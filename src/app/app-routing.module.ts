import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './template/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from "./template/components/auth/login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./template/components/overview/overview.module').then(m => m.OverviewModule) },
                    { path: 'uikit', loadChildren: () => import('./template/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'search-clinics', loadChildren: () => import('./template/components/search-clinics/search-clinics.module').then(m => m.SearchClinicsModule) },
                    { path: 'search-professional', loadChildren: () => import('./template/components/search-professional/search-professional.module').then(m => m.SearchProfessionalModule) },
                    { path: 'search-procedure', loadChildren: () => import('./template/components/search-procedure/search-procedure.module').then(m => m.SearchProcedureModule) },
                    { path: 'personal-data', loadChildren: () => import('./template/components/personal-data/personal-data.module').then(m => m.PersonalDataModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./template/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./template/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
