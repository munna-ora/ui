import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/apis/property.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  offerList: Array<any>;

  constructor(private srvProperty: PropertyService) { 
    this.offerList = [];
    this.getOfferList();
  }

  ngOnInit() {
  }
  getOfferList() {
    this.srvProperty.getOfferList({}).subscribe((res) => {
      console.log('getOfferList data', res);
      if (res.responseCode === '200') {
         this.offerList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

}
