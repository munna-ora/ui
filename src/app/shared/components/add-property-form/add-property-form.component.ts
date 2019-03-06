import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { PropertyService } from '../../../services/apis/property.service';

@Component({
  selector: 'app-add-property-form',
  templateUrl: './add-property-form.component.html',
  styleUrls: ['./add-property-form.component.scss']
})
export class AddPropertyFormComponent implements OnInit {

  addPropertyForm: FormGroup;
  propertyTypes: Array<any>;
  spaceRules: Array<any>;
  latitude: any;
  longitude: any;
  guestAccess: Array<any>;
  nearbyPlaces: Array<any>;
  specialExperienceList: Array<any>;
  stayTypeList: Array<any>;
  sexCategoryList: Array<any>;
  dropdownSettings: any;
  meridian = true;
  isCompleted: boolean;

  constructor(
    private fb: FormBuilder,
    private srvProperty: PropertyService,
  ) {
    this.latitude = 22.5726;
    this.longitude = 88.3639;
    this.guestAccess = [];
    this.nearbyPlaces = [];
    this.spaceRules = [];
    this.specialExperienceList = [];
    this.stayTypeList = [];
    this.getPropertyTypes();
    this.getSpaceRuleList();
    this.getSpecialExperienceList();
    this.getStayTypeList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'experienceId',
      textField: 'experienceName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
  };
  this.sexCategoryList = [{
    name: 'Male',
    value: 'MALE',
    image: 'assets/images/elements/male.png'
  },
  {
    name: 'Female',
    value: 'FEMALE',
    image: 'assets/images/elements/female.png'
  },
  {
    name: 'Both',
    value: 'BOTH',
    image: 'assets/images/elements/both.png'
  }];
  this.buildAddPropertyForm();
  }

  ngOnInit() {

  }

  buildAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      step1: this.fb.group({
        propertyType: new FormControl('', [Validators.required])
      }),
      step2: this.fb.group({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      }),
      step3: this.fb.group({
        guestAccess: new FormControl('', [Validators.required]),
        places: new FormControl('', [Validators.required])
      }),
      step4: this.fb.group({
        ruleName: this.fb.array([]),
        specialExperience: new FormControl('', [Validators.required])
      }),
      step5: this.fb.group({
        checkInTime: new FormControl({hour: 10, minute: 30}, [Validators.required]),
        checkOutTime: new FormControl({hour: 12, minute: 30}, [Validators.required]),
        strictCheckIn: new FormControl('yes', [Validators.required])
      }),
      step6: this.fb.group({
        coverPhotoImg: new FormControl('', [Validators.required]),
        morePhotoImgs: new FormControl('', [Validators.required])
      }),
      step7: this.fb.group({
        entireApartment: new FormControl('Y', [Validators.required])
      }),
      step8: this.fb.group({
        apartmentName: new FormControl('', [Validators.required]),
        apartmentNumber: new FormControl('', [Validators.required])
      }),
      step9: this.fb.group({
        stayTypeName: new FormControl('Long Term', [Validators.required])
      }),
      step10: this.fb.group({
        sexCategory: new FormControl('', [Validators.required])
      }),
      step11: this.fb.group({
        multipleRoom: new FormControl('true', [Validators.required])
      }),

      step21: this.fb.group({
        accountNumber: new FormControl('', [Validators.required]),
        accountHolderName: new FormControl('', [Validators.required]),
        accountType: new FormControl('', [Validators.required]),
        bankName: new FormControl('', [Validators.required]),
        branchName: new FormControl('', [Validators.required]),
        ifscCode: new FormControl('', [Validators.required]),
      }),
      step22: this.fb.group({
        documentName: new FormControl('', [Validators.required]),
        documentNumber: new FormControl('', [Validators.required]),
        documentFile: new FormControl('', [Validators.required]),
      }),
      step23: this.fb.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
      }),
      step24: this.fb.group({
        contactName: new FormControl('', [Validators.required]),
        altMobile: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(10)]),
        landline: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        altEmail: new FormControl('', [Validators.required, Validators.email])
      })
    });
  }

  get ruleNameArray(): FormArray {
    return this.addPropertyForm.get('step4.ruleName') as FormArray;
  }
  onSubmitPropertyForm() {
    console.log(this.addPropertyForm);
    console.log(this.addPropertyForm.value);
    this.isCompleted = true;
  }
  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
  }

  onCoverImgChange($event) {
    const file = $event.target.files[0];
    this.addPropertyForm.patchValue({
      step6: {coverPhotoImg: file ? file.name : ''}
    });
  }

  onMorePhotoChange($event) {
    const file = $event.target.files[0];
    console.log($event.target.files);
    this.addPropertyForm.patchValue({
      step6: {morePhotoImgs: file ? file.name : ''}
    });
  }

  onMoreUploadRoomImages($event) {
    const file = $event.target.files[0];
    this.addPropertyForm.patchValue({
      step14: {roomVsImages: file ? file.name : ''}
    });
  }

  onDocumentUpload($event) {
    const file = $event.target.files[0];
    this.addPropertyForm.patchValue({
      step22: {documentFile: file ? file.name : ''}
    });
  }

  updateRoomCount(evt) {
    console.log('Room Count Changed =>', evt);
    this.addPropertyForm.patchValue({
      step12: {roomCount: evt}
    });
  }

  updateAdultCount(evt) {
    console.log('Adult Count Changed =>', evt);
    this.addPropertyForm.patchValue({
      step15: {noOfGuest: evt}
    });
  }

  updateChildCount(evt) {
    console.log('Child Count Changed =>', evt);
    this.addPropertyForm.patchValue({
      step15: {noOfChild: evt}
    });
  }

  updateCotCount(evt) {
    console.log('Cot Count Changed =>', evt);
    this.addPropertyForm.patchValue({
      step15: {noOfCot: evt}
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

 getSpaceRuleList() {
  this.srvProperty.getSpaceRuleList({languageId: 1}).subscribe((res) => {
   if (res.responseCode === '200') {
     this.spaceRules = res.responseBody;
     const control = <FormArray>this.addPropertyForm.controls.step4.get('ruleName');
     console.log(control);
     this.spaceRules.map(c => control.push(new FormControl(false)));
   }
 }, error => {
   console.log('error', error);
 });
}

getSpecialExperienceList() {
  this.srvProperty.getSpecialExperienceList({languageId: 1}).subscribe((res) => {
   if (res.responseCode === '200') {
     this.specialExperienceList = res.responseBody;
   }
 }, error => {
   console.log('error', error);
 });
}
getStayTypeList() {
  this.srvProperty.getStayTypeList({languageId: 1}).subscribe((res) => {
   if (res.responseCode === '200') {
     this.stayTypeList = res.responseBody;
   }
 }, error => {
   console.log('error', error);
 });
}

}
