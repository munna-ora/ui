import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flight-booking-roundtrip',
  templateUrl: './flight-booking-roundtrip.component.html',
  styleUrls: ['./flight-booking-roundtrip.component.scss']
})
export class FlightBookingRoundtripComponent implements OnInit {
  @ViewChild('dpFlight') dpFlight: NgbInputDatepicker;

  public isCollapsed = true;
  
  hoveredDate: NgbDate;
  f_fromDate: NgbDate;
  f_toDate: NgbDate;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig) {
    this.f_fromDate = calendar.getToday();
    this.f_toDate = calendar.getNext(calendar.getToday(), 'd', 3);

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2020, month: 12, day: 31};
  }

  onDateSelectionFlight(date: NgbDate) {
    if (!this.f_fromDate && !this.f_toDate) {
      this.f_fromDate = date;
    } else if (this.f_fromDate && !this.f_toDate) {
      this.f_toDate = date;
      this.dpFlight.close();
    } else {
      this.f_toDate = null;
      this.f_fromDate = date;
    }
  }

  isHoveredFlight(date: NgbDate) {
    return this.f_fromDate && !this.f_toDate && this.hoveredDate && date.after(this.f_fromDate) && date.before(this.hoveredDate);
  }

  isInsideFlight(date: NgbDate) {
    return date.after(this.f_fromDate) && date.before(this.f_toDate);
  }

  isRangeFlight(date: NgbDate) {
    return date.equals(this.f_fromDate) || date.equals(this.f_toDate) || this.isInsideFlight(date) || this.isHoveredFlight(date);
  }

  ngOnInit() {
  }


}
