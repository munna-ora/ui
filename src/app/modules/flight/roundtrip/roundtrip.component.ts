import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roundtrip',
  templateUrl: './roundtrip.component.html',
  styleUrls: ['./roundtrip.component.scss']
})
export class RoundtripComponent implements OnInit {
  public isCollapsed = true;

  @Input() flightData: any;
  @Input() flightSearchObj: any;
  @Output() flightSelectedEvent  = new EventEmitter<any>();
  airlineNames: Array<any>;
  flightListDepart: Array<any>;
  flightListReturn: Array<any>;
  fareDetailsDepart: Array<any>;
  fareDetailsReturn: Array<any>;
  departFlightSelected: any;
  returnFlightSelected: any;
  constructor() {
    this.flightListDepart = [];
    this.flightListReturn = [];
    this.airlineNames = [];
    this.fareDetailsDepart = [];
    this.fareDetailsReturn = [];
  }
  ngOnInit() {
    const originAirportCode = this.flightSearchObj.multiCities[0].origin.airportCode;
    const destinationAirportCode = this.flightSearchObj.multiCities[0].destination.airportCode;
    const flightDepartDate =  this.flightSearchObj.multiCities[0].flightDepartDate;
    const flightDepartReturn =  this.flightSearchObj.multiCities[0].arrival_date;
    const flightDateDepart =  flightDepartDate.year + this.minTwoDigits(flightDepartDate.month) + this.minTwoDigits(flightDepartDate.day);
    // tslint:disable-next-line:max-line-length
    const flightDateReturn =  flightDepartReturn.year + this.minTwoDigits(flightDepartReturn.month) + this.minTwoDigits(flightDepartReturn.day);
    const dataSearchKeyDepart = originAirportCode + destinationAirportCode + flightDateDepart;
    const dataSearchKeyReturn = destinationAirportCode + originAirportCode + flightDateReturn;
    this.flightListDepart = this.flightData.resultData[0].fltSchedule[dataSearchKeyDepart];
    this.fareDetailsDepart = this.flightData.resultData[0].fareDetails[dataSearchKeyDepart];
    this.airlineNames = this.flightData.resultData[0].fltSchedule['airlineNames'];
    this.flightListReturn = this.flightData.resultData[0].fltSchedule[dataSearchKeyReturn];
    this.fareDetailsReturn = this.flightData.resultData[0].fareDetails[dataSearchKeyReturn];
  }
   minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }
  getAirlineName( code) {
    return this.airlineNames[code];
  }
  getFareDepart(flightId) {
    const fareO = this.fareDetailsDepart[flightId]['O'];
    return fareO.revisedFareDetails.tf;
  }
  getFareReturn(flightId) {
    const fareO = this.fareDetailsReturn[flightId]['O'];
    return fareO.revisedFareDetails.tf;
  }
  handleDepartFlightChange(event) {
     if (this.departFlightSelected && this.returnFlightSelected) {
        const arr = [this.departFlightSelected, this.returnFlightSelected];
        this.flightSelectedEvent.emit(arr);
     }
  }

}
