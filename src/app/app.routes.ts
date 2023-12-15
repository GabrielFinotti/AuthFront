import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';

// Components
import { SignComponent } from './core/components/pages/sign/sign.component';
import { HomeComponent } from './components/admin/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: SignComponent },
  { path: 'admin', component: HomeComponent, canActivate: [authGuard] },
];
