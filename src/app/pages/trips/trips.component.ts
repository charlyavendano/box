import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TripEvent {
  date: number;
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

// The calendar will now be dynamic, so the day object needs more info
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
  
  public currentDate: Date = new Date(2026, 1, 1); // Start with Feb 2026 to show events
  public calendarDays: CalendarDay[] = [];
  
  // Events remain hardcoded. In a real app, this would come from a service.
  private events: { [key: number]: TripEvent } = {
    6: { date: 6, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan' },
    7: { date: 7, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan' },
    8: { date: 8, label: 'Recogiendo', icon: 'flag-usa', bgColor: 'cyan', textColor: 'cyan' },
    9: { date: 9, label: 'Viajando USA->SV', icon: 'plane-usa-sv', bgColor: 'white', textColor: 'cyan' },
    10: { date: 10, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy' },
    11: { date: 11, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy' },
    12: { date: 12, label: 'Entregando', icon: 'flag-sv', bgColor: 'navy', textColor: 'navy' },
    13: { date: 13, label: 'Viajando SV->USA', icon: 'plane-sv-usa', bgColor: 'white', textColor: 'navy' }
  };

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
    const endDayOfMonth = lastDayOfMonth.getDate();

    // --- Fill days from previous month ---
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      this.calendarDays.push({
        date: new Date(year, month - 1, day),
        dayOfMonth: day,
        isCurrentMonth: false
      });
    }

    // --- Fill days of the current month ---
    // Only apply events if we are in Feb 2026
    const isEventMonth = year === 2026 && month === 1; 

    for (let day = 1; day <= endDayOfMonth; day++) {
      this.calendarDays.push({
        date: new Date(year, month, day),
        dayOfMonth: day,
        isCurrentMonth: true,
        event: isEventMonth ? this.events[day] : undefined
      });
    }

    // --- Fill days from next month to complete the grid ---
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
