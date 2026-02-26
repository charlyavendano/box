import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AdminUser {
    name: string;
    email: string;
    mailbox: string;
    phone: string;
    status: 'Activo' | 'Pendiente' | 'Suspendido';
    joinDate: string;
}

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Gestión de Usuarios</h2>
          <p class="text-slate-500 font-medium">Administración de casilleros y cuentas de clientes.</p>
        </div>
        <div class="flex space-x-2">
            <button class="bg-white border text-slate-600 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center">
                📥 Exportar CSV
            </button>
            <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center">
                <span class="mr-2">👤</span> Nuevo Usuario
            </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div class="p-6 border-b bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="relative flex-1">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input type="text" placeholder="Buscar por nombre, email o BXS..." class="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all text-sm font-medium">
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs font-bold text-slate-400 uppercase mr-2 tracking-widest">Filtrar por:</span>
                <button class="px-3 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter shadow-sm">Todos</button>
                <button class="px-3 py-1.5 bg-white border text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-tighter hover:bg-slate-50 transition-colors">Activos</button>
                <button class="px-3 py-1.5 bg-white border text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-tighter hover:bg-slate-50 transition-colors">Pendientes</button>
            </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Cliente / Casillero</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Contacto</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Fecha Registro</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
                <th class="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr *ngFor="let user of users" class="hover:bg-slate-50/50 transition-colors group">
                <td class="px-6 py-5">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs shadow-inner">
                            {{ getInitials(user.name) }}
                        </div>
                        <div>
                            <p class="font-black text-slate-900 group-hover:text-red-600 transition-colors">{{ user.name }}</p>
                            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest">{{ user.mailbox }}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm font-bold text-slate-600">{{ user.email }}</p>
                  <p class="text-xs text-slate-400">{{ user.phone }}</p>
                </td>
                <td class="px-6 py-5 text-slate-500 text-sm font-medium">{{ user.joinDate }}</td>
                <td class="px-6 py-5">
                  <span [class]="getStatusClass(user.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                    <div class="flex items-center justify-center space-x-2">
                        <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-all shadow-sm bg-white border" title="Editar Perfil">✏️</button>
                        <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-500 transition-all shadow-sm bg-white border" title="Ver Historial">📋</button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class AdminUsersComponent {
    users: AdminUser[] = [
        { name: 'Carlos Avendaño', email: 'c.avendano@email.com', mailbox: 'BXS-994433', phone: '+503 7788-9900', status: 'Activo', joinDate: '12 Ene, 2026' },
        { name: 'Maria Gomez', email: 'm.gomez@email.com', mailbox: 'BXS-778811', phone: '+503 7122-3344', status: 'Activo', joinDate: '15 Ene, 2026' },
        { name: 'Juan Perez', email: 'j.perez@email.com', mailbox: 'BXS-556622', phone: '+503 7899-0011', status: 'Pendiente', joinDate: '24 Feb, 2026' },
        { name: 'Ana Martinez', email: 'a.martinez@email.com', mailbox: 'BXS-445566', phone: '+503 7000-1122', status: 'Activo', joinDate: '05 Feb, 2026' },
        { name: 'Roberto Diaz', email: 'r.diaz@email.com', mailbox: 'BXS-112233', phone: '+503 7444-5566', status: 'Suspendido', joinDate: '20 Ene, 2026' },
    ];

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Activo': return 'bg-green-100 text-green-600';
            case 'Pendiente': return 'bg-yellow-100 text-yellow-600';
            case 'Suspendido': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    }
}
