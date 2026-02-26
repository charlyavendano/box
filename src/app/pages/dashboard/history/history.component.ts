import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Shipment {
  id: string;
  trackingNumber: string;
  description: string;
  date: string;
  status: 'En bodega' | 'En tránsito' | 'En aduana' | 'Listo para entrega' | 'Entregado';
  weight: number;
}

interface ShipmentDetail extends Shipment {
  origin: string;
  destination: string;
  sender: string;
  receiver: string;
  items: { description: string; quantity: number }[];
  history: { date: string; status: string; location: string }[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  selectedShipment: ShipmentDetail | null = null;

  shipments: Shipment[] = [
    // ... (existing shipments)
    {
      id: '1',
      trackingNumber: 'BOX-99443301',
      description: 'Laptop Dell XPS 15',
      date: '24 Feb, 2026',
      status: 'En tránsito',
      weight: 5.5
    },
    {
      id: '2',
      trackingNumber: 'BOX-99443302',
      description: 'Zapatos Deportivos Nike',
      date: '20 Feb, 2026',
      status: 'En bodega',
      weight: 2.1
    },
    {
      id: '3',
      trackingNumber: 'BOX-99443299',
      description: 'Repuestos Automotrices',
      date: '15 Feb, 2026',
      status: 'Entregado',
      weight: 15.0
    },
    {
      id: '4',
      trackingNumber: 'BOX-99443288',
      description: 'iPhone 15 Pro Max',
      date: '10 Feb, 2026',
      status: 'Entregado',
      weight: 1.2
    }
  ];

  viewDetail(shipment: Shipment) {
    // Mocking detailed data for the selected shipment
    this.selectedShipment = {
      ...shipment,
      origin: 'Houston, TX, USA',
      destination: 'San Miguel, El Salvador',
      sender: 'Amazon.com',
      receiver: 'Carlos Avendano',
      items: [
        { description: 'Laptop Dell XPS 15 (i7, 32GB RAM)', quantity: 1 },
        { description: 'Protector de pantalla', quantity: 1 }
      ],
      history: [
        { date: '24 Feb, 2026 - 10:00 AM', status: 'En tránsito', location: 'Miami Hub' },
        { date: '23 Feb, 2026 - 02:30 PM', status: 'Procesado', location: 'Houston Office' },
        { date: '22 Feb, 2026 - 09:00 AM', status: 'Recibido en Bodega', location: 'Houston Office' }
      ]
    };
  }

  closeDetail() {
    this.selectedShipment = null;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'En tránsito': return 'bg-blue-100 text-blue-600';
      case 'En bodega': return 'bg-cyan-100 text-cyan-600';
      case 'Entregado': return 'bg-green-100 text-green-600';
      case 'Listo para entrega': return 'bg-purple-100 text-purple-600';
      case 'En aduana': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }
}
