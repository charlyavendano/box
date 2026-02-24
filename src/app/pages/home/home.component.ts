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
      src: 'https://images.unsplash.com/photo-1601581875030-450994ce9566?w=1920&q=80',
      alt: 'Logistics and delivery'
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
      alt: 'Delivery trucks'
    },
    {
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
      alt: 'Happy customers receiving packages'
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
