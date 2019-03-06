import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-my-cancellations',
  templateUrl: './user-my-cancellations.component.html',
  styleUrls: ['./user-my-cancellations.component.scss']
})
export class UserMyCancellationsComponent implements OnInit {
  @ViewChild('dpHotel') dpHotel: NgbInputDatepicker;
  hoveredDate: NgbDate;
  h_fromDate: NgbDate;
  h_toDate: NgbDate;
  onFirstSelection = true;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig) {
    this.h_fromDate = calendar.getToday();
    this.h_toDate = calendar.getNext(calendar.getToday(), 'd', 3);

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2020, month: 12, day: 31};
  }
  onDateSelectionHotel(date: NgbDate) {
    if (!this.h_fromDate && !this.h_toDate) {
      this.h_fromDate = date;
    } else if (this.h_fromDate && !this.h_toDate) {
      this.h_toDate = date;
      this.dpHotel.close();
    } else {
      this.h_toDate = null;
      this.h_fromDate = date;
    }
  }
  isHoveredHotel(date: NgbDate) {
    return this.h_fromDate && !this.h_toDate && this.hoveredDate && date.after(this.h_fromDate) && date.before(this.hoveredDate);
  }

  isInsideHotel(date: NgbDate) {
    return date.after(this.h_fromDate) && date.before(this.h_toDate);
  }

  isRangeHotel(date: NgbDate) {
    return date.equals(this.h_fromDate) || date.equals(this.h_toDate) || this.isInsideHotel(date) || this.isHoveredHotel(date);
  }

  ngOnInit() {
  }

}
