import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbDate, NgbCalendar, NgbDatepickerConfig, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @ViewChild('dpHotel') dpHotel: NgbInputDatepicker;
  @ViewChild('dpFlight') dpFlight: NgbInputDatepicker;

  hNoOfAdult: number = 0;
  hNoOfChild: number = 0;
  noOfRooms: number = 0;
  hoveredDate: NgbDate;
  h_fromDate: NgbDate;
  h_toDate: NgbDate;
  f_fromDate: NgbDate;
  f_toDate: NgbDate;
  onFirstSelection = true;

  public checkboxGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, calendar: NgbCalendar, config: NgbDatepickerConfig) {
    this.h_fromDate = calendar.getToday();
    this.h_toDate = calendar.getNext(calendar.getToday(), 'd', 3);

    this.f_fromDate = calendar.getToday();
    this.f_toDate = calendar.getNext(calendar.getToday(), 'd', 3);

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2020, month: 12, day: 31};
  }

  ngOnInit() {
    this.checkboxGroupForm = this.formBuilder.group({
      excellent: true,
      very_good: false,
      good: false,
      all_of_kolkata: true,
      saltlake: false,
      parkstreet: false,
      all_facilities: true,
      airconditioner: false,
      wifi: false,
      television: false,
      under_299: true,
      under_299_999: false,
      under_999_1499: true,
      under_1499_1999: false,

      popularity: false,
      price_lowest_first: true,
      couples_frindly: false,
      pet_friendly: false
    });
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

  isHoveredHotel(date: NgbDate) {
    return this.h_fromDate && !this.h_toDate && this.hoveredDate && date.after(this.h_fromDate) && date.before(this.hoveredDate);
  }

  isInsideHotel(date: NgbDate) {
    return date.after(this.h_fromDate) && date.before(this.h_toDate);
  }

  isRangeHotel(date: NgbDate) {
    return date.equals(this.h_fromDate) || date.equals(this.h_toDate) || this.isInsideHotel(date) || this.isHoveredHotel(date);
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


}
