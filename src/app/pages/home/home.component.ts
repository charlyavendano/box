import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesComponent } from '../../components/services/services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private intervalId: any;

  images = [
    {
      src: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1920&q=80',
      alt: 'Avión de carga internacional'
    },
    {
      src: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80',
      alt: 'Logística terrestre y transporte'
    },
    {
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
      alt: 'Centro de distribución y almacenamiento'
    }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startCarousel();
  }
}
