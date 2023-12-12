import { Routes } from '@angular/router';

// Components
import { SignComponent } from './core/components/pages/sign/sign.component';
import { HomeComponent } from './components/admin/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: SignComponent },
  { path: 'admin', component: HomeComponent },
];
