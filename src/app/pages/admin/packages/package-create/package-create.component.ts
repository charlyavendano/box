import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-package-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    <div class="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button routerLink="/admin/paquetes" class="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">
            ⬅️
          </button>
          <div>
            <h2 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Ingresar Paquete</h2>
            <p class="text-slate-500 font-medium">Registro de nueva mercancía en bodega USA.</p>
          </div>
        </div>
      </div>

      <form [formGroup]="packageForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Main Info Card -->
        <div class="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
          <h3 class="text-xl font-bold text-slate-900 flex items-center">
            <span class="mr-2">📝</span> Datos Principales
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Número de Tracking</label>
              <input 
                type="text" 
                formControlName="tracking"
                placeholder="UPS / FEDEX / USPS..." 
                class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-bold text-slate-700"
              >
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cliente (BXS / Nombre)</label>
              <div class="relative">
                <input 
                  type="text" 
                  formControlName="customer"
                  placeholder="BXS-994433 / Carlos..." 
                  class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-bold text-slate-700"
                >
                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">👤</div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Descripción del Contenido</label>
              <textarea 
                formControlName="description"
                rows="3" 
                placeholder="¿Qué contiene el paquete?" 
                class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium text-slate-700 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Logistics & Calculation Card -->
        <div class="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
          <h3 class="text-xl font-bold flex items-center text-white relative z-10">
            <span class="mr-2">⚖️</span> Logística y Cobro
          </h3>
          
          <div class="space-y-4 relative z-10">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Peso (Lbs)</label>
                <input 
                  type="number" 
                  formControlName="weight"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold text-white"
                >
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Valor Declarado ($)</label>
                <input 
                  type="number" 
                  formControlName="declaredValue"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold text-white"
                >
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Vuelo Asignado (Opcional)</label>
              <select 
                formControlName="flight"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:ring-2 focus:ring-red-600 cursor-pointer font-bold text-white"
              >
                <option value="">Pendiente de asignar</option>
                <option value="AA-452">AA-452 (28 Feb)</option>
                <option value="DL-881">DL-881 (02 Mar)</option>
              </select>
            </div>

            <div class="pt-6 border-t border-white/10 space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400 font-medium">Cargo por Libra ($2.50)</span>
                <span class="font-bold text-white">{{ (packageForm.get('weight')?.value || 0) * 2.5 | currency }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400 font-medium">Impuestos estimados</span>
                <span class="font-bold text-white">{{ (packageForm.get('declaredValue')?.value || 0) * 0.13 | currency }}</span>
              </div>
              <div class="flex justify-between items-center pt-3 border-t border-white/10">
                <span class="text-xs font-black uppercase tracking-widest text-red-500">Total Estimado</span>
                <span class="text-2xl font-black text-white italic">
                  {{ ((packageForm.get('weight')?.value || 0) * 2.5) + ((packageForm.get('declaredValue')?.value || 0) * 0.13) | currency }}
                </span>
              </div>
            </div>
          </div>
          <div class="absolute -right-10 -bottom-10 text-[180px] opacity-5 pointer-events-none">📥</div>
        </div>

        <!-- Form Actions -->
        <div class="md:col-span-2 flex items-center justify-end space-x-4 pt-4">
          <button 
            type="button"
            routerLink="/admin/paquetes"
            class="px-8 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-tighter text-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            [disabled]="packageForm.invalid"
            class="px-12 py-4 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95 uppercase tracking-tighter text-sm"
          >
            Registrar e Imprimir Etiqueta 🏷️
          </button>
        </div>
      </form>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class PackageCreateComponent {
    packageForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.packageForm = this.fb.group({
            tracking: ['', Validators.required],
            customer: ['', Validators.required],
            description: ['', Validators.required],
            weight: [0, [Validators.required, Validators.min(0.1)]],
            declaredValue: [0, [Validators.required, Validators.min(0)]],
            flight: ['']
        });
    }

    onSubmit() {
        if (this.packageForm.valid) {
            console.log('New Package Registered:', this.packageForm.value);
            alert('¡Paquete registrado exitosamente en sistema!');
            this.router.navigate(['/admin/paquetes']);
        }
    }
}
