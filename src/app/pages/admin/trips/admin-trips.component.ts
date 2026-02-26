import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AdminTrip {
    flight: string;
    destination: string;
    date: string;
    packetsCount: number;
    status: 'Abierto' | 'Cerrado' | 'En Vuelo';
    id: string;
}

@Component({
    selector: 'app-admin-trips',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Control de Vuelos</h2>
          <p class="text-slate-500 font-medium">Gestión logística de envíos aéreos.</p>
        </div>
        <button class="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center">
          <span class="mr-2">✈️</span> Programar Vuelo
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-3xl border shadow-sm">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bodega Miami</p>
          <div class="flex items-end space-x-2">
            <span class="text-3xl font-black text-slate-900">124</span>
            <span class="text-xs font-bold text-slate-400 mb-1">paquetes listos</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-3xl border shadow-sm">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Próximo Cierre</p>
          <div class="flex items-end space-x-2">
            <span class="text-3xl font-black text-red-600">48h</span>
            <span class="text-xs font-bold text-slate-400 mb-1">Vuelo AA-452</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-3xl border shadow-sm border-b-4 border-b-green-500">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eficiencia Logística</p>
          <div class="flex items-end space-x-2">
            <span class="text-3xl font-black text-slate-900">92%</span>
            <span class="text-xs font-bold text-slate-400 mb-1">este mes</span>
          </div>
        </div>
      </div>

      <!-- Trips Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div *ngFor="let trip of trips" class="bg-white rounded-3xl border shadow-sm overflow-hidden group hover:border-red-600/30 transition-all">
          <div class="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🛫</div>
                <div>
                    <h4 class="font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight italic">{{ trip.flight }}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase">{{ trip.date }}</p>
                </div>
            </div>
            <span [class]="getStatusClass(trip.status)" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
              {{ trip.status }}
            </span>
          </div>
          <div class="p-6 flex justify-between items-center">
            <div class="flex items-center space-x-8">
                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Destino</p>
                    <p class="text-sm font-black text-slate-700 uppercase italic tracking-tighter">{{ trip.destination }}</p>
                </div>
                <div class="text-center">
                    <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Paquetes</p>
                    <p class="text-sm font-black text-slate-900">{{ trip.packetsCount }}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-tighter transition-all">Ver Manifiesto</button>
                <button [disabled]="trip.status === 'Cerrado'" class="bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-tighter transition-all shadow-md active:scale-95">Gestionar</button>
            </div>
          </div>
          <div class="h-1 bg-slate-100 w-full overflow-hidden">
            <div [class]="getProgressBarClass(trip.status)" [style.width]="getCompletion(trip.status) + '%'" class="h-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class AdminTripsComponent {
    trips: AdminTrip[] = [
        { id: '1', flight: 'AA-452 (Miami - SV)', destination: 'San Salvador, ES', date: '28 Feb, 2026', packetsCount: 85, status: 'Abierto' },
        { id: '2', flight: 'DL-881 (Houston - SV)', destination: 'San Salvador, ES', date: '02 Mar, 2026', packetsCount: 42, status: 'Abierto' },
        { id: '3', flight: 'UA-903 (Miami - SV)', destination: 'San Salvador, ES', date: '25 Feb, 2026', packetsCount: 110, status: 'En Vuelo' },
        { id: '4', flight: 'AA-411 (Miami - SV)', destination: 'San Salvador, ES', date: '21 Feb, 2026', packetsCount: 94, status: 'Cerrado' },
    ];

    getStatusClass(status: string): string {
        switch (status) {
            case 'Abierto': return 'bg-blue-100 text-blue-600';
            case 'Cerrado': return 'bg-slate-100 text-slate-600';
            case 'En Vuelo': return 'bg-green-100 text-green-600 animate-pulse';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    getProgressBarClass(status: string): string {
        switch (status) {
            case 'Abierto': return 'bg-blue-500';
            case 'Cerrado': return 'bg-slate-400';
            case 'En Vuelo': return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    }

    getCompletion(status: string): number {
        switch (status) {
            case 'Abierto': return 65;
            case 'Cerrado': return 100;
            case 'En Vuelo': return 100;
            default: return 0;
        }
    }
}
