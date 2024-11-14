import { Routes } from '@angular/router';
import {AppMainComponent} from './layout/app.main/app.main.component';
import {CondominioListComponent} from './components/condominios/condominio-list/condominio-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '', component: AppMainComponent, canActivate: [AuthGuard],
    children:[
      {path: 'condominios', component:CondominioListComponent},
      {path: '', redirectTo: 'condominios', pathMatch: 'full'}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }
];
