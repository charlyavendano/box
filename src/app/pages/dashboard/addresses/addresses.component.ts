import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Address {
  id: number;
  label: string;
  country: 'USA' | 'SV';
  line1: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent {
  addresses: Address[] = [
    {
      id: 1,
      label: 'Oficina Principal Houston',
      country: 'USA',
      line1: '6601 Hillcroft Ave, Suite 135',
      city: 'Houston',
      state: 'Texas',
      zip: '77081',
      isDefault: true
    },
    {
      id: 2,
      label: 'Casa San Miguel',
      country: 'SV',
      line1: 'Residencial Los Pinos, Poligono H #12',
      city: 'San Miguel',
      state: 'San Miguel',
      zip: '3301',
      isDefault: false
    }
  ];
}
