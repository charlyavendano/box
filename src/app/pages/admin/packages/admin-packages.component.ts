import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface AdminPackage {
  tracking: string;
  customer: string;
  mailbox: string;
  status: string;
  date: string;
  weight: string;
}

@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Gestión de Paquetes</h2>
          <p class="text-slate-500 font-medium">Control total de la mercancía recibida y en tránsito.</p>
        </div>
        <button 
          routerLink="/admin/paquetes/nuevo"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center"
        >
          <span class="mr-2">➕</span> Nuevo Ingreso
        </button>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div class="relative flex-1 w-full">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            placeholder="Buscar por tracking, cliente o casillero..." 
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
          >
        </div>
        <select class="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/20 cursor-pointer font-bold text-slate-600 w-full md:w-48">
          <option value="">Todos los Estados</option>
          <option value="received">Recibido</option>
          <option value="transit">En Tránsito</option>
          <option value="delivered">Entregado</option>
        </select>
      </div>

      <!-- Packages Table -->
      <div class="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Tracking / Casillero</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Fecha Ingreso</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Peso</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr *ngFor="let pkg of filteredPackages" class="hover:bg-slate-50/50 transition-colors group">
                <td class="px-6 py-5">
                  <p class="font-black text-slate-900 group-hover:text-red-600 transition-colors">{{ pkg.tracking }}</p>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">{{ pkg.mailbox }}</p>
                </td>
                <td class="px-6 py-5 font-bold text-slate-600 text-sm">{{ pkg.customer }}</td>
                <td class="px-6 py-5 text-slate-500 text-sm">{{ pkg.date }}</td>
                <td class="px-6 py-5 font-black text-slate-700 text-sm">{{ pkg.weight }}</td>
                <td class="px-6 py-5">
                  <span [class]="getStatusClass(pkg.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {{ pkg.status }}
                  </span>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-600" title="Editar Estado">✏️</button>
                    <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-600" title="Ver Detalle">👁️</button>
                    <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-green-600" title="Imprimir Etiqueta">🏷️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Placeholder -->
        <div class="bg-slate-50 px-6 py-4 border-t flex justify-between items-center">
          <p class="text-xs font-bold text-slate-400">Mostrando {{ filteredPackages.length }} resultados</p>
          <div class="flex space-x-2">
            <button class="px-4 py-2 border rounded-xl bg-white text-xs font-bold text-slate-400 hover:bg-slate-100 transition-all">Anterior</button>
            <button class="px-4 py-2 border rounded-xl bg-red-600 text-white text-xs font-bold shadow-md active:scale-95 transition-all">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminPackagesComponent {
  searchQuery = '';

  packages: AdminPackage[] = [
    { tracking: 'BOX-994433-221', customer: 'Carlos Avendaño', mailbox: 'BXS-994433', status: 'Recibido', date: '25 Feb, 2026', weight: '2.5 Lbs' },
    { tracking: 'BOX-778811-105', customer: 'Maria Gomez', mailbox: 'BXS-778811', status: 'En Tránsito', date: '24 Feb, 2026', weight: '1.2 Lbs' },
    { tracking: 'BOX-556622-098', customer: 'Juan Perez', mailbox: 'BXS-556622', status: 'Entregado', date: '22 Feb, 2026', weight: '5.0 Lbs' },
    { tracking: 'BOX-112233-332', customer: 'Roberto Diaz', mailbox: 'BXS-112233', status: 'En Aduana', date: '26 Feb, 2026', weight: '0.8 Lbs' },
    { tracking: 'BOX-445566-441', customer: 'Ana Martinez', mailbox: 'BXS-445566', status: 'Procesado', date: '25 Feb, 2026', weight: '3.1 Lbs' },
  ];

  get filteredPackages() {
    return this.packages.filter(p =>
      p.tracking.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.customer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.mailbox.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Recibido': return 'bg-blue-100 text-blue-600';
      case 'En Tránsito': return 'bg-yellow-100 text-yellow-600 underline decoration-yellow-600 decoration-wavy';
      case 'Entregado': return 'bg-green-100 text-green-600';
      case 'En Aduana': return 'bg-purple-100 text-purple-600';
      case 'Procesado': return 'bg-slate-100 text-slate-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }
}
