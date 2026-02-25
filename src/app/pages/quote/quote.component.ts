import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class QuoteComponent {
  quoteForm: FormGroup;

  categories: Category[] = [
    { id: 'ropa', name: 'Ropa / Textil', tax: 0 },
    { id: 'electronicos', name: 'Electrónicos', tax: 15 },
    { id: 'zapatos', name: 'Calzado', tax: 5 },
    { id: 'juguetes', name: 'Juguetes', tax: 0 },
    { id: 'varios', name: 'Varios / Otros', tax: 0 }
  ];

  formattedValue = '0.00';
  formattedWeight = '0.0';
  formattedVolumetricWeight = '0.0';
  formattedUsedWeight = '0.0';
  formattedWeightCost = '0.00';
  formattedCategoryTax = '0.00';
  formattedSubtotal = '0.00';
  formattedIVA = '0.00';
  formattedTotal = '0.00';

  isVolumetricHigher = false;

  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      category: ['ropa', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      length: [0, [Validators.min(0)]],
      width: [0, [Validators.min(0)]],
      height: [0, [Validators.min(0)]]
    });

    this.updateCalculations();
  }

  updateCalculations() {
    const value = Number(this.quoteForm.get('value')?.value || 0);
    const weight = Number(this.quoteForm.get('weight')?.value || 0);
    const length = Number(this.quoteForm.get('length')?.value || 0);
    const width = Number(this.quoteForm.get('width')?.value || 0);
    const height = Number(this.quoteForm.get('height')?.value || 0);

    const categoryId = this.quoteForm.get('category')?.value;
    const category = this.categories.find(c => c.id === categoryId) || this.categories[0];

    // Volumetric Weight calculation: (L * W * H) / 166
    const volWeight = (length * width * height) / 166;
    const usedWeight = Math.max(weight, volWeight);
    this.isVolumetricHigher = volWeight > weight;

    this.formattedValue = value.toFixed(2);
    this.formattedWeight = weight.toFixed(1);
    this.formattedVolumetricWeight = volWeight.toFixed(1);
    this.formattedUsedWeight = usedWeight.toFixed(1);

    // Cost per pound is $7.00
    const weightCost = usedWeight * 7;
    this.formattedWeightCost = weightCost.toFixed(2);

    const categoryTax = value * (category.tax / 100);
    this.formattedCategoryTax = categoryTax.toFixed(2);

    const subtotal = categoryTax + weightCost;
    this.formattedSubtotal = subtotal.toFixed(2);

    const iva = subtotal * 0.13;
    this.formattedIVA = iva.toFixed(2);

    const total = subtotal + iva;
    this.formattedTotal = total.toFixed(2);
  }

  shareOnWhatsApp() {
    const destination = '50377777777'; // Mock phone number
    const text = `*Cotización Box Express*%0A%0A` +
      `*Categoría:* ${this.quoteForm.get('category')?.value}%0A` +
      `*Valor:* $${this.formattedValue}%0A` +
      `*Peso:* ${this.formattedUsedWeight} lbs%0A` +
      `*Total Estimado:* $${this.formattedTotal}%0A%0A` +
      `_Calculado con peso ${this.isVolumetricHigher ? 'volumétrico' : 'real'}_`;

    window.open(`https://wa.me/${destination}?text=${text}`, '_blank');
  }
}
