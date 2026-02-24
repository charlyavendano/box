import { Component } from '@angular/core';
import { ServicesComponent as ServicesSectionComponent } from '../../components/services/services.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [ServicesSectionComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {}
