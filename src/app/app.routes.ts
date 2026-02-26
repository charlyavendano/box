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
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'rastreo',
    loadComponent: () => import('./pages/tracking/tracking.component').then(m => m.TrackingComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'direcciones',
        loadComponent: () => import('./pages/dashboard/addresses/addresses.component').then(m => m.AddressesComponent)
      },
      {
        path: 'historial',
        loadComponent: () => import('./pages/dashboard/history/history.component').then(m => m.HistoryComponent)
      },
      {
        path: 'rastreo',
        loadComponent: () => import('./pages/tracking/tracking.component').then(m => m.TrackingComponent)
      },
      {
        path: 'cotizar',
        loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/overview/admin-overview.component').then(m => m.AdminOverviewComponent)
      },
      {
        path: 'paquetes',
        loadComponent: () => import('./pages/admin/packages/admin-packages.component').then(m => m.AdminPackagesComponent)
      },
      {
        path: 'paquetes/nuevo',
        loadComponent: () => import('./pages/admin/packages/package-create/package-create.component').then(m => m.PackageCreateComponent)
      },
      {
        path: 'vuelos',
        loadComponent: () => import('./pages/admin/trips/admin-trips.component').then(m => m.AdminTripsComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/admin/users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'config',
        loadComponent: () => import('./pages/admin/admin-config.component').then(m => m.AdminConfigComponent)
      }
    ]
  }
];
