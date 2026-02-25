import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TripEvent {
  date: number;
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
  fullDate: Date;
}

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  event?: TripEvent;
}

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  public currentDate: Date = new Date(2026, 1, 1);
  public calendarDays: CalendarDay[] = [];
  public nextTrip: TripEvent | null = null;
  public upcomingEvents: TripEvent[] = [];

  private events: { [key: number]: TripEvent } = {
    6: { date: 6, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan', fullDate: new Date(2026, 1, 6) },
    7: { date: 7, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan', fullDate: new Date(2026, 1, 7) },
    8: { date: 8, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan', fullDate: new Date(2026, 1, 8) },
    9: { date: 9, label: 'Viajando USA->SV', icon: 'plane-usa-sv', bgColor: 'white', textColor: 'cyan', fullDate: new Date(2026, 1, 9) },
    10: { date: 10, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy', fullDate: new Date(2026, 1, 10) },
    11: { date: 11, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy', fullDate: new Date(2026, 1, 11) },
    12: { date: 12, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy', fullDate: new Date(2026, 1, 12) },
    13: { date: 13, label: 'Viajando SV->USA', icon: 'plane-sv-usa', bgColor: 'white', textColor: 'navy', fullDate: new Date(2026, 1, 13) }
  };

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
    this.calculateNextTrip();
  }

  calculateNextTrip(): void {
    const today = new Date();
    // For demo purposes, we treat current Date as start of Feb 2026
    const simToday = new Date(2026, 1, 5);

    const tripDates = Object.values(this.events).sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
    this.upcomingEvents = tripDates.filter(t => t.fullDate >= simToday);
    this.nextTrip = this.upcomingEvents.length > 0 ? this.upcomingEvents[0] : null;
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay();
    const endDayOfMonth = lastDayOfMonth.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      this.calendarDays.push({
        date: new Date(year, month - 1, day),
        dayOfMonth: day,
        isCurrentMonth: false
      });
    }

    const isEventMonth = year === 2026 && month === 1;

    for (let day = 1; day <= endDayOfMonth; day++) {
      this.calendarDays.push({
        date: new Date(year, month, day),
        dayOfMonth: day,
        isCurrentMonth: true,
        event: isEventMonth ? this.events[day] : undefined
      });
    }

    const lastDayOfWeek = lastDayOfMonth.getDay();
    const daysToAdd = 6 - lastDayOfWeek;
    for (let i = 1; i <= daysToAdd; i++) {
      this.calendarDays.push({
        date: new Date(year, month + 1, i),
        dayOfMonth: i,
        isCurrentMonth: false
      });
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }
}
