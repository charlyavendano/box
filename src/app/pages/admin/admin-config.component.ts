import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-config',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-fade-in">
      <div>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Configuración</h2>
        <p class="text-slate-500 font-medium">Ajustes generales del sistema y parámetros operativos.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <h3 class="text-xl font-bold text-slate-900">Parámetros de Cotización</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-black text-slate-400 uppercase mb-2">Precio por Libra (Base)</label>
                    <input type="text" value="$2.50" class="w-full bg-slate-50 border rounded-xl px-4 py-3 font-bold text-slate-700">
                </div>
                <div>
                    <label class="block text-xs font-black text-slate-400 uppercase mb-2">IVA (%)</label>
                    <input type="text" value="13%" class="w-full bg-slate-50 border rounded-xl px-4 py-3 font-bold text-slate-700">
                </div>
                <button class="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl w-full">Guardar Cambios</button>
            </div>
        </div>

        <div class="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <h3 class="text-xl font-bold text-slate-900">Notificaciones y Alertas</h3>
            <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span class="text-sm font-bold text-slate-700">Notificar vuelo cerrado</span>
                    <div class="w-12 h-6 bg-green-500 rounded-full relative"><div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span class="text-sm font-bold text-slate-700">Alerta de mora automática</span>
                    <div class="w-12 h-6 bg-slate-300 rounded-full relative"><div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <button class="border border-slate-200 text-slate-600 font-bold py-3 px-6 rounded-xl w-full hover:bg-slate-50 transition-all">Restaurar Valores</button>
            </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class AdminConfigComponent { }
