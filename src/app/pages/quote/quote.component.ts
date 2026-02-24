import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  quoteForm: FormGroup;
  
  formattedValue = '0.00';
  formattedWeight = '0.0';
  formattedWeightCost = '0.00';
  formattedSubtotal = '0.00';
  formattedIVA = '0.00';
  formattedTotal = '0.00';

  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      category: ['0', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]]
    });
    
    this.updateCalculations();
  }

  updateCalculations() {
    const value = Number(this.quoteForm.get('value')?.value || 0);
    const weight = Number(this.quoteForm.get('weight')?.value || 0);
    
    this.formattedValue = value.toFixed(2);
    this.formattedWeight = weight.toFixed(1);
    
    const weightCost = weight * 7;
    this.formattedWeightCost = weightCost.toFixed(2);
    
    const categoryPercent = 0;
    const categoryCost = value * (categoryPercent / 100);
    const subtotal = categoryCost + weightCost;
    this.formattedSubtotal = subtotal.toFixed(2);
    
    const iva = subtotal * 0.13;
    this.formattedIVA = iva.toFixed(2);
    
    const total = subtotal + iva;
    this.formattedTotal = total.toFixed(2);
  }

  calculateWeightCost(): number {
    const weight = this.quoteForm.get('weight')?.value || 0;
    return weight * 7;
  }

  calculateSubtotal(): number {
    const value = this.quoteForm.get('value')?.value || 0;
    const categoryPercent = 0;
    const categoryCost = value * (categoryPercent / 100);
    const weightCost = this.calculateWeightCost();
    return categoryCost + weightCost;
  }

  calculateIVA(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal * 0.13;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateIVA();
  }
}
