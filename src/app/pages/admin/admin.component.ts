import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent {
    isSidebarOpen = false;

    menuItems = [
        { label: 'Dashboard', path: '/admin', icon: '📈', exact: true },
        { label: 'Paquetes', path: '/admin/paquetes', icon: '📦', exact: false },
        { label: 'Vuelos/Viajes', path: '/admin/vuelos', icon: '✈️', exact: false },
        { label: 'Usuarios', path: '/admin/usuarios', icon: '👥', exact: false },
        { label: 'Configuración', path: '/admin/config', icon: '⚙️', exact: false },
    ];

    constructor(private router: Router) { }

    logout() {
        this.router.navigate(['/login']);
    }
}
