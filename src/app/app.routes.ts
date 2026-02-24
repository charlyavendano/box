import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'cotizar',
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./pages/trips/trips.component').then(m => m.TripsComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  }
];
