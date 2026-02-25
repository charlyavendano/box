import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface TrackingStep {
  status: string;
  description: string;
  date: string;
  location: string;
  completed: boolean;
  current: boolean;
}

interface TrackingData {
  id: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  currentStatus: string;
  steps: TrackingStep[];
}

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent {
  trackingForm: FormGroup;
  trackingResult: TrackingData | null = null;
  searched = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  searchPackage() {
    if (this.trackingForm.invalid) return;

    this.searched = true;
    this.error = null;
    const trackingNumber = this.trackingForm.value.trackingNumber.toUpperCase();

    // Mock search logic
    if (trackingNumber === 'BOX-123') {
      this.trackingResult = {
        id: 'BOX-123',
        sender: 'Juan Pérez',
        receiver: 'María Garcia',
        origin: 'Houston, TX',
        destination: 'San Miguel, SV',
        currentStatus: 'En Tránsito',
        steps: [
          {
            status: 'Recibido en Bodega',
            description: 'El paquete ha sido recibido en nuestra sucursal de Houston.',
            date: '2026-02-20 10:30 AM',
            location: 'Houston, TX',
            completed: true,
            current: false
          },
          {
            status: 'Procesado',
            description: 'El paquete ha sido procesado y preparado para el envío.',
            date: '2026-02-21 02:15 PM',
            location: 'Houston, TX',
            completed: true,
            current: false
          },
          {
            status: 'En Tránsito',
            description: 'El paquete va camino a El Salvador.',
            date: '2026-02-23 08:00 AM',
            location: 'Internacional',
            completed: false,
            current: true
          },
          {
            status: 'En Aduana',
            description: 'Esperando revisiones aduanales.',
            date: '--',
            location: 'San Salvador, SV',
            completed: false,
            current: false
          },
          {
            status: 'Listo para Entrega',
            description: 'El paquete está listo para ser recogido o entregado.',
            date: '--',
            location: 'San Miguel, SV',
            completed: false,
            current: false
          }
        ]
      };
    } else {
      this.trackingResult = null;
      this.error = 'No se encontró ninguna encomienda con ese número de guía.';
    }
  }
}
