import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SharedService} from '../../../services/shared.service';
import { PropertyService } from '../../../services/apis/property.service';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const google: any;
@Component({
  selector: 'app-earning-calculator',
  templateUrl: './earning-calculator.component.html',
  styleUrls: ['./earning-calculator.component.scss']
})
export class EarningCalculatorComponent implements OnInit {

  earningCalculatorForm: FormGroup;
  latitude: any;
  longitude: any;
  totalEarningAmount: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  propertyTypes: Array<any>;
  constructor(
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private srvProperty: PropertyService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.buildCalculatorForm();
    this.getPropertyTypes();

  }

  ngOnInit() {

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
          this.earningCalculatorForm.patchValue({location: place.formatted_address});
        });
      });
    });
  }
     /**
   * This method is responsible for building, setup input filed
   */
  buildCalculatorForm() {
    this.earningCalculatorForm = this.fb.group({
      propertyTypeId: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      noOfGuest: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }
  getPropertyTypes() {
    this.srvProperty.getPropertyTypes({}).subscribe((res) => {
     console.log('getPropertyTypes data', res);
     if (res.responseCode === '200') {
       this.propertyTypes = res.responseBody;
     }
   }, error => {
     console.log('error', error);
   });
 }

 onSubmit() {
  if (this.earningCalculatorForm.valid) {
     const requestParam  = Object.assign({}, this.earningCalculatorForm.value);
     requestParam['latitude'] = + this.latitude;
     requestParam['longitude'] = + this.longitude;
     console.log(requestParam);
     // this.earningCalculatorForm.reset(this.earningCalculatorForm.value);
     this.calculateEarning(requestParam);

  } else {
    this.sharedSrv.validateAllFormFields(this.earningCalculatorForm);
  }
 }
 onStartHosting() {
  this.router.navigate(['/host']);
 }
 calculateEarning(requestObj) {
  this.srvProperty.calculatePrice(requestObj).subscribe((res) => {
    console.log('calculateEarning', res);
    if (res.responseCode === '200') {
      this.totalEarningAmount = res.responseBody;
    }
  }, error => {
    console.log('error', error);
  });
 }

}
