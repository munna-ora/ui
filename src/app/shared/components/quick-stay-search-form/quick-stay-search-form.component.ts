import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-quick-stay-search-form',
  templateUrl: './quick-stay-search-form.component.html',
  styleUrls: ['./quick-stay-search-form.component.scss']
})
export class QuickStaySearchFormComponent implements OnInit {

  @Input() searchObj: object;
  @Input() bookStayObj: object;  
  @Input() propertyDetails: object;
  @Output() bookYourStay  = new EventEmitter<any>();
  checkInDate: any;
  checkOutDate: any;
  totalNoOfGuest: number;

  constructor(
    private modalService: NgbModal,
    private sharedSrv: SharedService,
  ) {

  }
  ngOnInit() {
   console.log('QuickStaySearchFormComponent', this.bookStayObj);
   if (Object.keys(this.bookStayObj).length) {
      this.checkInDate = this.bookStayObj['checkInDate'];
      this.checkOutDate = this.bookStayObj['checkOutDate'];
      const rooms = this.bookStayObj['rooms'];
      let totalNoOfGuest = 0;
      for (let i = 0; i < rooms.length; i++) {
        totalNoOfGuest +=  parseInt(rooms[i].noOfGuest) + parseInt(rooms[i].noOfChild ? rooms[i].noOfChild : 0);
      }
      this.totalNoOfGuest = totalNoOfGuest;
   }
  }
  openModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup host-details' });
}
bookYourStayForm() {
  this.bookYourStay.emit(this.bookStayObj);
}

}
