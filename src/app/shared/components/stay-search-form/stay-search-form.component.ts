import { Component, OnInit, Input, ViewChild, ElementRef, NgZone,  Output , EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WhiteSpaceValidator } from '../../../directives/validators/white-space-validation';
import { SharedService} from '../../../services/shared.service';
// tslint:disable-next-line:max-line-length
import { NgbDate, NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbInputDatepicker, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {Router} from '@angular/router';
declare const google: any;


@Component({
  selector: 'app-stay-search-form',
  templateUrl: './stay-search-form.component.html',
  styleUrls: ['./stay-search-form.component.scss']
})
export class StaySearchFormComponent implements OnInit, OnChanges  {

  @Input() propertyTypes: Array<any>;
  @Input() searchObj: object;
  @Input() pageName: string;
  @Output() searchFormSubmitted  = new EventEmitter<string>();
  staySearchForm: FormGroup;
  noOfGuest: Array<number>;
  noOfChild: Array<number>;
  numberOfRooms: number;
  numberOfGuest: number;
  checkInDate: any;
  checkOutDate: any;
  checkOutMinDate: any;
  checkInMinDate: any;
  latitude: any;
  longitude: any;
  stayType: string;
  noOfGuestShared: any;
  detailsPage: boolean;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('d2') datePicker: NgbInputDatepicker;

  constructor(
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private parserFormatter: NgbDateParserFormatter,
    private router: Router
  ) {
    this.checkInDate = calendar.getToday();
    this.checkOutDate = calendar.getNext(calendar.getToday(), 'd', 3);
    const currentDate = new Date();
    // config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    this.checkOutMinDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    this.checkInMinDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    this.noOfGuest = [1];
    this.noOfChild = [0];
    this.numberOfRooms = 1;
    this.numberOfGuest = 1;
    this.stayType = 'PRIVATE';
    this.noOfGuestShared = 1;
    this.buildSearchForm();
  }
  fromModel(date: Date): NgbDateStruct {
    return date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } : null;
  }

  ngOnInit() {
    if (this.pageName === 'property-details') {
      this.detailsPage = true;
    }
    if (this.searchObj) {
      this.latitude = + this.searchObj['latitude'];
      this.longitude = + this.searchObj['longitude'];
      const selectedCheckInDate = new Date(this.searchObj['checkInDate']);
      const selectedCheckOutDate = new Date(this.searchObj['checkOutDate']);
      // tslint:disable-next-line:max-line-length
      this.checkInDate = { year: selectedCheckInDate.getFullYear(), month: selectedCheckInDate.getMonth() + 1, day: selectedCheckInDate.getDate() };
      // tslint:disable-next-line:max-line-length
      this.checkOutDate = { year: selectedCheckOutDate.getFullYear(), month: selectedCheckOutDate.getMonth() + 1, day: selectedCheckOutDate.getDate() };
      this.checkOutMinDate = this.checkInDate;
      this.stayType = this.searchObj['stayType'];
      this.noOfGuestShared = this.searchObj['noOfGuest'];
      const rooms = this.searchObj['rooms'];
      if (rooms.length > 0) {
        this.removeRoom(0);
        for (let i = 0; i < rooms.length; i++) {
          this.addRoom(rooms[i].noOfGuest, rooms[i].noOfChild);
        }
      }
      console.log(this.checkInDate);
      this.staySearchForm.patchValue(this.searchObj);
      this.staySearchForm.patchValue({
        checkInDate : this.checkInDate,
        checkOutDate: this.checkOutDate
      });

    } else {
      this.staySearchForm.patchValue({
        rooms : [{noOfGuest: 1, noOfChild: 0 }]
      });
    }

      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ['geocode']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.latitude = place.geometry.location.lat().toFixed(6);
            this.longitude = place.geometry.location.lng().toFixed(6);
            this.staySearchForm.patchValue({location: place.formatted_address});
          });
        });
      });
    }

   /**
   * This method is responsible for building, setup input filed and validator of stay search form
   */
  buildSearchForm() {
    this.staySearchForm = this.fb.group({
      propertyTypeId: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      stayType: new FormControl(this.stayType, [Validators.required]),
      checkInDate: new FormControl(this.checkInDate, [Validators.required]),
      checkOutDate: new FormControl(this.checkOutDate, [Validators.required]),
      rooms: this.fb.array([this.buildRoomForm(1, 0)]),
      noOfGuestShared: new FormControl(this.noOfGuestShared)
    });
    console.log(this.staySearchForm);
  }
  buildRoomForm(noOfGuest, noOfChild ) {
    return this.fb.group({
      noOfGuest: new FormControl(noOfGuest, [Validators.required]),
      noOfChild: new FormControl(noOfChild, [Validators.required])
      });
  }

  onSubmitSearch() {
    console.log(this.staySearchForm);
    if (this.staySearchForm.valid) {
       const searchParam  = Object.assign({}, this.staySearchForm.value);
       console.log(searchParam);
       const checkInDate = this.parserFormatter.format(searchParam.checkInDate);
       const checkOutDate = this.parserFormatter.format(searchParam.checkOutDate);
       searchParam.checkInDate = checkInDate;
       searchParam.checkOutDate = checkOutDate;
       searchParam['latitude'] = + this.latitude;
       searchParam['longitude'] = + this.longitude;
       searchParam.stayType = this.stayType;
       searchParam.noOfGuest = this.noOfGuestShared;
       console.log(searchParam);
       localStorage.setItem('searchObj', JSON.stringify(searchParam));
       this.sharedSrv.sharedHomeSearchData = searchParam;
       this.searchFormSubmitted.emit(searchParam);
       if (this.detailsPage) {
        this.router.navigate(['/properties/property-details'], { queryParams: searchParam });
       } else {
        this.router.navigate(['/properties'], { queryParams: searchParam });
       }
       console.log('here');
    } else {
      this.sharedSrv.validateAllFormFields(this.staySearchForm);
    }
  }
  onNumberChanged(val: number, index: number , filedName: string) {
    console.log(event);
    const formArray  = this.staySearchForm.get('rooms') as FormArray;
    formArray.at(index)['controls'][filedName].patchValue(val);
    this.setNumberOfGuest();
  }

  get roomsArray(): FormArray {
    return this.staySearchForm.get('rooms') as FormArray;
  }
  addRoom(noOfGuest = 1, noOfChild= 0 ) {
    // (this.staySearchForm.controls['rooms'] as FormArray).push(this.buildRoomForm());
    this.roomsArray.push(this.buildRoomForm(noOfGuest , noOfChild));
    this.noOfGuest.push(noOfGuest);
    this.noOfChild.push(noOfChild);
    this.numberOfRooms++;
    this.setNumberOfGuest();
  }
  removeRoom(index: number) {
    // const arrayControl = <FormArray>this.staySearchForm.controls['rooms'];
      //  arrayControl.removeAt(index);
    this.roomsArray.removeAt(index);
    this.noOfGuest.splice(index, 1);
    this.noOfChild.splice(index, 1);
    this.numberOfRooms--;
    this.setNumberOfGuest();
  }
  setNumberOfGuest() {
    this.numberOfGuest = this.noOfGuest.reduce((a, b) => a + b, 0) + this.noOfChild.reduce((a, b) => a + b, 0);
  }
  onCheckInDateSelect(event) {
    console.log(event);
    this.checkInDate = event;
    this.checkOutDate = null;
    this.staySearchForm.patchValue({checkOutDate: ''});
    this.checkOutMinDate = event;
    this.datePicker.open();
  }
  ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
    }
}
