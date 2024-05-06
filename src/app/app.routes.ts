import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/decree-calc', pathMatch: 'full' },
    // {
    //     path: 'home', component: HomeComponent,
    // },
    {
        path: 'decree-calc',
        data: { mode: 'decree-calc' },
        loadChildren: () => {
            return import('./features/decree-calc/feature/degree-routes').then((m) => m.routes);
        },
    },

];
