import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent implements OnInit {
  panelOpenState = false;
  step = 1;
  totalSeatCol;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.totalSeatCol = 30;
  }

  openModal(content) {
    // , size: 'md'
      this.modalService.open(content, { windowClass: 'modal-popup flight-service-modal', centered: true, size: 'lg' });
  }

  seatsArray(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}
