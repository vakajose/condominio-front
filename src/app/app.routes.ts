import { Routes } from '@angular/router';
import {AppMainComponent} from './layout/app.main/app.main.component';
import {CondominioListComponent} from './components/condominios/condominio-list/condominio-list.component';

export const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children:[{
      path: 'condominios', component:CondominioListComponent
    }]
  }
];
