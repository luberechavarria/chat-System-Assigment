import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },

  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent)
  },

  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./components/account/account.component').then(mod => mod.AccountComponent)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
  },
];
