import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { SharedService} from '../../../services/shared.service';
import { FlightService } from '../../../services/apis/flight.service';
// tslint:disable-next-line:max-line-length
import { NgbDate, NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbInputDatepicker, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-flight-quick-search',
  templateUrl: './flight-quick-search.component.html',
  styleUrls: ['./flight-quick-search.component.scss']
})
export class FlightQuickSearchComponent implements OnInit {

  @Input() flightSearchObj: any;
  @Input() totalResultCount: number;
  @Output() searchFormSubmitted  = new EventEmitter<string>();
  flightSearchForm: FormGroup;
  searching = false;
  searchFailed = false;
  noOfAdults: number;
  noOfChild: number;
  noOfInfants: number;
  numberOfTraveller: number;
  flightClassTypes:  Array<any>;
  flightTypes:  Array<any>;
  tripType: string;
  classType: string;
  arrivalMinDate: any;
  departMinDate: any;
  
  @ViewChild('d2') datePicker: NgbInputDatepicker;
  
  constructor(
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    private flightSrv: FlightService,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    private parserFormatter: NgbDateParserFormatter,
    private router: Router
  ) {
    const currentDate = new Date();
    this.arrivalMinDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    this.departMinDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };

      this.buildSearchForm();
      this.noOfAdults = 1;
      this.noOfChild = 0;
      this.noOfInfants = 0;
      this.numberOfTraveller = 0;
      this.tripType = 'R';
      this.classType = 'Economy';
      this.flightClassTypes = [
        {
          id: 'Economy',
          name: 'Economy'
        },
        {
          id: 'Premium Economy',
          name: 'Premium Economy'
        },
        {
          id: 'Business',
          name: 'Business'
        },
        {
          id: 'First Class',
          name: 'First Class'
        }
      ];
      this.flightTypes = [
      {
        id: 'O',
        name: 'One way'
      },
      {
        id: 'R',
        name: 'Round trip'
      },
      {
        id: 'M',
        name: 'Multi city'
      }
      ];
  }

    // For auto complete
    formatMatches = (value: any) => value ? value.cityName + ' (' + value.airportCode + ')' : '';
    search = (text$: Observable<string>) =>
      text$
        .debounceTime(300)
        .distinctUntilChanged()
        .do(() => this.searching = true)
    .switchMap(term => term.length < 2 ? [] : this.flightSrv.getAirport({keyword : term})
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
    .do(() => this.searching = false)

  ngOnInit() {
    console.log(this.flightSearchObj);
    if (this.flightSearchObj) {
      this.noOfAdults = this.flightSearchObj.noOfAdults ? this.flightSearchObj.noOfAdults : 1;
      this.noOfChild = this.flightSearchObj.noOfChild ? this.flightSearchObj.noOfChild : 0;
      this.noOfInfants = this.flightSearchObj.noOfInfants ? this.flightSearchObj.noOfInfants : 0;
      this.tripType = this.flightSearchObj.tripType ? this.flightSearchObj.tripType : 'R';
      this.classType = this.flightSearchObj.classType ? this.flightSearchObj.classType : 'Economy';
      this.onNumberChanged(this.noOfAdults, 'noOfAdults');
      this.onNumberChanged(this.noOfChild, 'noOfChild');
      this.onNumberChanged(this.noOfInfants, 'noOfInfants');
      this.flightSearchForm.patchValue({
        classType : this.classType,
        tripType: this.tripType,
        multiCities: this.flightSearchObj.multiCities
      });
    } else {
      this.onNumberChanged(this.noOfAdults, 'noOfAdults');
      this.onNumberChanged(this.noOfChild, 'noOfChild');
      this.onNumberChanged(this.noOfInfants, 'noOfInfants');
    }
    this.tripTypeChanage(this.tripType);
    this.onChangeTripType();
  }

  onChangeTripType(): void {
    this.flightSearchForm.controls['tripType'].valueChanges.subscribe((value) => {
      console.log(value);
      this.tripTypeChanage(value);
    });
  }
    /**
   * This method is responsible for building, setup input filed and validator of flight search form
   */
  buildSearchForm() {
    this.flightSearchForm = this.fb.group({
      tripType : new FormControl('R', [Validators.required]),
      noOfAdults : new FormControl('', []),
      noOfChild : new FormControl('', []),
      noOfInfants : new FormControl('', []),
      classType : new FormControl('Economy', [Validators.required]),
      multiCities: this.fb.array([this.buildMultiCityFrom()]),
    });
    console.log(this.flightSearchForm);
  }
  buildMultiCityFrom() {
    return this.fb.group({
      destination : new FormControl('', [Validators.required]),
      flightDepartDate : new FormControl(null, [Validators.required]),
      origin: new FormControl('', [Validators.required]),
      arrival_date : new FormControl(null, []),
    });
  }
  onSubmitSearch() {
    if (this.flightSearchForm.valid) {
       const searchParam  = Object.assign({}, this.flightSearchForm.value);
       this.sharedSrv.flightSearchData = searchParam;
       localStorage.setItem('flightSearchObj', JSON.stringify(searchParam));
       this.router.navigate(['/flight'], { queryParams: searchParam });
       this.searchFormSubmitted.emit(searchParam);
    } else {
      this.sharedSrv.validateAllFormFields(this.flightSearchForm);
    }
  }
  getFlightList(keyword) {
    this.flightSrv.getAirport({keyword : keyword}).subscribe((res) => {
      console.log('getFlightList data', res);
      if (res.responseCode === '200') {

      }
    }, error => {
      console.log('error', error);
    });
  }
  onNumberChanged(val: number, filedName: string) {
    const flightSearchForm = this.flightSearchForm;
    flightSearchForm['controls'][filedName].patchValue(val);
    this.setNumberOfTravellers();
  }
  setNumberOfTravellers() {
      this.numberOfTraveller = this.noOfAdults + this.noOfChild + this.noOfInfants;
  }
  onCheckInDateSelect(event) {
    this.datePicker.open();
  }

  setClassTypeValue(val) {
    this.classType = val;
  }
  tripTypeChanage(val) {
    console.log(val);
    if (val === 'R') {
      this.flightSearchForm.controls.multiCities['controls'][0].get('arrival_date').setValidators([Validators.required]);
    } else {
      this.flightSearchForm.controls.multiCities['controls'][0].get('arrival_date').setValidators(null);
    }
    this.flightSearchForm.controls.multiCities['controls'][0].get('arrival_date').updateValueAndValidity();

  }

}
