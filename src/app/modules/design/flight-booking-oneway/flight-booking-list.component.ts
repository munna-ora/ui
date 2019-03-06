import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flight-booking-list',
  templateUrl: './flight-booking-list.component.html',
  styleUrls: ['./flight-booking-list.component.scss']
})
export class FlightBookingListComponent implements OnInit {
  @ViewChild('dpFlight') dpFlight: NgbInputDatepicker;

  public isCollapsed = true;
  
  hoveredDate: NgbDate;
  f_fromDate: NgbDate;
  f_toDate: NgbDate;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, private modalService: NgbModal) {
    this.f_fromDate = calendar.getToday();
    this.f_toDate = calendar.getNext(calendar.getToday(), 'd', 3);

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2020, month: 12, day: 31};

   
  }
  
  modalReference;
  openModal(content) {
    // , size: 'md'
    this.modalReference = this.modalService.open(content, { windowClass: 'modal-popup personal-info' });
  }

  openPaymentModal(content) {
    // , size: 'md'
    this.modalReference.close();
    this.modalService.open(content, { windowClass: 'modal-popup payment', size: 'lg' });
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
