import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-8 animate-fade-in">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Resumen Operativo</h2>
          <p class="text-slate-500 font-medium">Estado actual de la logística y operaciones.</p>
        </div>
        <div class="px-4 py-2 bg-white rounded-xl shadow-sm border font-bold text-slate-600 text-sm">
          Hoy: {{ today | date:'dd MMM, yyyy' }}
        </div>
      </div>

      <!-- Admin Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-red-600 flex flex-col justify-between h-40">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Paquetes Hoy</span>
            <span class="text-2xl">📦</span>
          </div>
          <div>
            <p class="text-4xl font-black text-slate-900">42</p>
            <p class="text-[10px] text-green-500 font-bold mt-1">+12% vs ayer</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-blue-600 flex flex-col justify-between h-40">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Próximo Vuelo</span>
            <span class="text-2xl">✈️</span>
          </div>
          <div>
            <p class="text-4xl font-black text-slate-900">Feb 28</p>
            <p class="text-[10px] text-blue-500 font-bold mt-1">Vuelo AA-452</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-green-600 flex flex-col justify-between h-40">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Usuarios Totales</span>
            <span class="text-2xl">👥</span>
          </div>
          <div>
            <p class="text-4xl font-black text-slate-900">1,204</p>
            <p class="text-[10px] text-green-500 font-bold mt-1">24 nuevos esta semana</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-purple-600 flex flex-col justify-between h-40">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Ingresos Mes</span>
            <span class="text-2xl">💰</span>
          </div>
          <div>
            <p class="text-4xl font-black text-slate-900">$18.4K</p>
            <p class="text-[10px] text-green-500 font-bold mt-1">Meta: $25K (74%)</p>
          </div>
        </div>
      </div>

      <!-- Quick Shortcuts -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-8 overflow-hidden relative">
            <div class="relative z-10">
                <h3 class="text-xl font-bold text-slate-900 mb-6">Actividad Logística Reciente</h3>
                <div class="space-y-4">
                    <div *ngFor="let activity of activities" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-colors">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg">
                                {{ activity.icon }}
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-900">{{ activity.title }}</p>
                                <p class="text-xs text-slate-500">{{ activity.time }}</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 bg-white border rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                            {{ activity.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden group">
            <div class="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <span class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 block">Herramienta Rápida</span>
                    <h3 class="text-2xl font-bold mb-4 italic">Manifestar Paquete</h3>
                    <p class="text-slate-400 text-sm mb-8">Escanea o ingresa el número de tracking para procesar entrada a bodega.</p>
                </div>
                <div class="space-y-4">
                    <input type="text" placeholder="BOX-XXXXXXXXX" class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-all text-white placeholder:text-white/30">
                    <button class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">
                        Procesar Ingreso
                    </button>
                </div>
            </div>
            <div class="absolute -right-12 -bottom-12 text-[200px] opacity-5 rotate-12 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform">🏷️</div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class AdminOverviewComponent {
    today = new Date();
    activities = [
        { title: 'Vuelo AA-452 manifestado', time: 'Hace 10 min', status: 'Operativo', icon: '✈️' },
        { title: 'Ingreso masivo - 24 paquetes', time: 'Hace 45 min', status: 'Completado', icon: '📦' },
        { title: 'Falla en sistema de rastreo (Resuelto)', time: 'Hace 2 horas', status: 'Incidencia', icon: '⚠️' },
        { title: '12 nuevos usuarios registrados', time: 'Hoy, 09:00 AM', status: 'Comunidad', icon: '👥' },
    ];
}
