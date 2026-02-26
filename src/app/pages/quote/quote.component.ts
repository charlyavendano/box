import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Category {
  id: string;
  name: string;
  tax: number;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent implements OnInit {
  @Input() inDashboard: boolean = false;
  quoteForm: FormGroup;

  categories: Category[] = [
    { id: '1', name: 'Ropa y Calzado', tax: 0 },
    { id: '2', name: 'Electrónicos (Menor a $200)', tax: 0 },
    { id: '3', name: 'Electrónicos (Mayor a $200)', tax: 15 },
    { id: '4', name: 'Repuestos', tax: 10 },
    { id: '5', name: 'Otros', tax: 15 }
  ];

  isVolumetricHigher = false;
  formattedWeight = '0.0';
  formattedVolumetricWeight = '0.0';
  formattedUsedWeight = '0.0';
  formattedWeightCost = '0.00';
  formattedCategoryTax = '0.00';
  formattedIVA = '0.00';
  formattedTotal = '0.00';

  constructor(private fb: FormBuilder, private router: Router) {
    this.quoteForm = this.fb.group({
      category: ['1'],
      value: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      length: [0],
      width: [0],
      height: [0]
    });
  }

  ngOnInit(): void {
    if (this.router.url.startsWith('/dashboard')) {
      this.inDashboard = true;
    }
  }

  updateCalculations() {
    const { category, value, weight, length, width, height } = this.quoteForm.value;

    this.formattedWeight = weight.toFixed(1);

    // Volumetric Weight: (L * W * H) / 166
    const volWeight = (length * width * height) / 166;
    this.formattedVolumetricWeight = volWeight.toFixed(1);

    const usedWeight = Math.max(weight, volWeight);
    this.formattedUsedWeight = usedWeight.toFixed(1);
    this.isVolumetricHigher = volWeight > weight;

    // Flete: $7.00 per Lb (example)
    const weightCost = usedWeight * 7.0;
    this.formattedWeightCost = weightCost.toFixed(2);

    // Taxes
    const selectedCat = this.categories.find(c => c.id === category);
    const catTax = value * ((selectedCat?.tax || 0) / 100);
    this.formattedCategoryTax = catTax.toFixed(2);

    // IVA (13%)
    const iva = (weightCost + catTax) * 0.13;
    this.formattedIVA = iva.toFixed(2);

    // Total
    const total = weightCost + catTax + iva;
    this.formattedTotal = total.toFixed(2);
  }

  shareOnWhatsApp() {
    const { trackingNumber } = this.quoteForm.value;
    const text = `*Cotización Box Express*%0A%0A` +
      `*Categoría:* ${this.categories.find(c => c.id === this.quoteForm.value.category)?.name}%0A` +
      `*Peso a cobrar:* ${this.formattedUsedWeight} Lbs%0A` +
      `*Impuestos:* $${this.formattedCategoryTax}%0A` +
      `*IVA:* $${this.formattedIVA}%0A%0A` +
      `*Total Estimado:* $${this.formattedTotal}%0A%0A` +
      `_Precios aproximados sujetos a revisión en bodega._`;

    window.open(`https://wa.me/50368373849?text=${text}`, '_blank');
  }
}
