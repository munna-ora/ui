import { Component, OnInit } from '@angular/core';
import { SharedService} from '../../../services/shared.service';
import { PropertyService } from '../../../services/apis/property.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserStorageProvider } from '../../../services/storage/user-storage.service';
import { AppConst } from '../../../app.constants';

@Component({
  selector: 'app-property-booking',
  templateUrl: './property-booking.component.html',
  styleUrls: ['./property-booking.component.scss']
})
export class PropertyBookingComponent implements OnInit {
  propertyDetails: object;
  bookStayObj: object;
  totalNoOfGuest: number;
  totalNoOfChild: number;
  objectKeys = Object.keys;
  bookingCompleted: boolean;
  userInfo: any;
  isLogined: any;

  travellerForm: FormGroup;
  travellerFormData: object;
  submitted = false;
  loading: boolean;

  bookingFormActionUrl: any;

  constructor(
    private sharedSrv: SharedService,
    private srvProperty: PropertyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userStorage: UserStorageProvider,
    ) {
      this.travellerFormBuilder();
      this.userInfo = this.userStorage.get();
      if (this.userInfo) {
        console.log(this.userInfo);
        this.isLogined = true;
      }
      this.bookingFormActionUrl = AppConst.PROPERTY_API_BASE_URL + '/property-booking'
    }

    ngOnInit(): void {
      const sharedBookingSearchdata = this.sharedSrv.sharedBookingSearchdata;
      const isSearchObjEmpty = !Object.keys(sharedBookingSearchdata).length;
      if (!isSearchObjEmpty) {
        this.getPropertyDetails(sharedBookingSearchdata);
        this.bookStayObj = sharedBookingSearchdata;
      } else {
        const bookStayObj = JSON.parse(localStorage.getItem('bookingSearchObj'));
        this.getPropertyDetails(bookStayObj);
        this.bookStayObj = bookStayObj;
      }
      if (Object.keys(this.bookStayObj).length) {
        const rooms = this.bookStayObj['rooms'];
        let totalNoOfGuest = 0;
        let totalNoOfChild = 0;
        for (let i = 0; i < rooms.length; i++) {
          totalNoOfGuest +=  rooms[i].noOfGuest;
          totalNoOfChild +=  rooms[i].noOfChild;
        }
        this.totalNoOfGuest = totalNoOfGuest;
        this.totalNoOfChild = totalNoOfChild;
     }
    }

    getPropertyDetails(params: any) {
      this.srvProperty.getPropertyPriceDetails(params).subscribe((res) => {
          if (res.responseCode === '200') {
              this.propertyDetails = res.responseBody;
          }
      }, error => {
          console.log('error', error);
      });
    }
    travellerFormBuilder(){
      const travellerFormData = JSON.parse(localStorage.getItem('travellerFormData'));
      this.travellerForm = this.formBuilder.group({
        prefix: new FormControl(travellerFormData ? travellerFormData['prefix']:'Mr.', [Validators.required]),
        firstName: new FormControl(travellerFormData ? travellerFormData['firstName']:'', [Validators.required]),
        lastName: new FormControl(travellerFormData ? travellerFormData['lastName']:'', [Validators.required]),
        email: new FormControl (travellerFormData ? travellerFormData['email']:'', [Validators.required, Validators.email]),
        mobile: new FormControl(travellerFormData ? travellerFormData['mobile']:'', [Validators.required]),
        address: new FormControl(travellerFormData ? travellerFormData['address']:'', [Validators.required]),
        gstNumberExist: travellerFormData ? travellerFormData['gstNumberExist']:false,
        gstNumber: travellerFormData ? travellerFormData['gstNumber']:'',
        termsConditions: new FormControl(travellerFormData ? travellerFormData['termsConditions']:true, [Validators.required]),
      });
    }
    get f() { return this.travellerForm.controls; }

    bookingFormSubmit(){
      this.bookingCompleted = true;
    }

    onSubmitTravellerForm() {
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.travellerForm.invalid) {
          return;
      }
      
      this.loading = true;
      this.travellerFormData = Object.assign({}, this.bookStayObj);
      if (this.userInfo) {
        this.travellerFormData['successURL'] = this.router.url;
        this.travellerFormData['failureURL'] = this.router.url;
        this.travellerFormData['userToken'] = this.userInfo.userToken;
        this.travellerFormData['totalAmt'] = this.propertyDetails['priceDetails']['finalPrice'];
        this.travellerFormData['bookingInfos'] = this.travellerForm.value; 
        this.travellerFormData['bookingInfos']['name'] = this.travellerFormData['bookingInfos'].firstName + ' ' + this.travellerFormData['bookingInfos'].lastName; 
        // console.log('responseData',JSON.stringify(this.travellerFormData));
        document.getElementById("bookingFormBtn").click();
      }else{
        localStorage.setItem('travellerFormData', JSON.stringify(this.travellerForm.value));
        document.getElementById("loginBtn").click();
      }
           

      // const travellerFormData =  this.travellerForm.value;
      // this.propertyService.contactOraDetails(contactFormData).subscribe((responseData) => {
      //   console.log('responseData', responseData);
      //   this.loading = false;
      // }, errorData => {
      //   console.log('error', errorData);
      //   this.loading = false;
      //   if (errorData && errorData.status === 400) {
      //     // this.errorMessage = errorData.error.responseMessage;
      //   }
      // });
    }

}
