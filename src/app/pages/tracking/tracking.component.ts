import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface TrackingStep {
  date: string;
  status: string;
  location: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface TrackingData {
  id: string;
  currentStatus: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  steps: TrackingStep[];
}

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit {
  @Input() inDashboard: boolean = false;
  trackingForm: FormGroup;
  trackingResult: TrackingData | null = null;
  searched = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // If we are in the dashboard route, set inDashboard to true automatically
    if (this.router.url.startsWith('/dashboard')) {
      this.inDashboard = true;
    }
  }

  searchPackage() {
    if (this.trackingForm.invalid) return;

    this.searched = true;
    this.error = null;
    const num = this.trackingForm.value.trackingNumber.toUpperCase();

    // Mock logic for demo
    if (num === 'BOX-123') {
      this.trackingResult = {
        id: 'BOX-123',
        currentStatus: 'En Tránsito',
        sender: 'Amazon.com',
        receiver: 'Carlos Avendano',
        origin: 'Houston, TX, USA',
        destination: 'San Miguel, El Salvador',
        steps: [
          {
            date: '24 Feb, 2026 - 10:00 AM',
            status: 'En Tránsito',
            location: 'Miami, FL Hub',
            description: 'El paquete ha salido del centro de distribución regional.',
            completed: false,
            current: true
          },
          {
            date: '23 Feb, 2026 - 02:30 PM',
            status: 'Procesado',
            location: 'Houston, TX Office',
            description: 'Recibido y procesado para envío internacional.',
            completed: true,
            current: false
          },
          {
            date: '22 Feb, 2026 - 09:15 AM',
            status: 'Recibido en Bodega',
            location: 'Houston, TX Office',
            description: 'El paquete ha sido entregado en nuestra oficina de Houston.',
            completed: true,
            current: false
          }
        ]
      };
    } else {
      this.trackingResult = null;
      this.error = 'No se encontró ningún paquete con ese número de guía. Por favor verifica e intenta de nuevo.';
    }
  }
}
