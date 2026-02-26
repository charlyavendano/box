import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen = false;

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/']);
  }

  menuItems = [
    { label: 'Resumen', path: '/dashboard', icon: '📊', exact: true },
    { label: 'Perfil', path: '/dashboard/perfil', icon: '👤', exact: false },
    { label: 'Direcciones', path: '/dashboard/direcciones', icon: '📍', exact: false },
    { label: 'Mis Paquetes', path: '/dashboard/historial', icon: '📦', exact: false },
    { label: 'Rastrear', path: '/dashboard/rastreo', icon: '🔍', exact: false },
    { label: 'Cotizar', path: '/dashboard/cotizar', icon: '🧮', exact: false },
  ];
}
