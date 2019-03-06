import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { ProfileService } from '../../../services/apis/profile.service';
import { PropertyService } from '../../../services/apis/property.service';
import { UserStorageProvider } from '../../../services/storage/user-storage.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, AfterViewInit {
  userProfileDetails: {};
  languageList: Array<any>;
  domainList: Array<any>;
  interestList: Array<any>;
  purposeList: Array<any>;
  languageDropdownSettings = {};
  interestDropdownSettings = {};
  domainDropdownSettings = {};
  userRole;
  userDetails;

  contactOraForm: FormGroup;
  submitted = false;
  loading: boolean;

  sectionScroll: string;
  constructor(private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private srvProfile: ProfileService,
    private propertyService: PropertyService,
    private formBuilder: FormBuilder,
    private userService: UserStorageProvider) { 
      this.userProfileDetails = {};
      this.languageList = [];
      this.domainList = [];
      this.interestList = [];
      this.purposeList = [];
      this.getUserProfileDetails();
      this.getLanguageList();
      this.getDomainList();
      this.getInterestList();
      this.getPurposeList();
  }

  openModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup' });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.doScrollToDiv();
      this.sectionScroll = null;
    });

    this.languageDropdownSettings = {
      singleSelection: false,
      idField: 'languageId',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.interestDropdownSettings = {
      singleSelection: false,
      idField: 'interestId',
      textField: 'interestName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.domainDropdownSettings = {
      singleSelection: false,
      idField: 'domainId',
      textField: 'domainName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    
  }

  contactOraFormBuilder(){
    this.contactOraForm = this.formBuilder.group({
      userName: new FormControl(this.userProfileDetails['userVsInfo'].name, [Validators.required]),
      mobileNumber: new FormControl(this.userProfileDetails['mobileNumber'], [Validators.required]),
      emailId: new FormControl (this.userProfileDetails['emailId'], [Validators.required, Validators.email]),
      contactPurposeId: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }
  get f() { return this.contactOraForm.controls; }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  scrollToDiv(page, dest) {
    this.sectionScroll = dest;
    this.router.navigate([page], {fragment: dest});
   // this.doScrollToDiv();
  }

  doScrollToDiv() {
    if (!this.sectionScroll && this.sectionScroll == null) {
      return;
    }
    try {
      console.log(this.sectionScroll);
      const element = document.getElementById(this.sectionScroll);
      element.scrollIntoView({behavior: 'smooth'});
    }
    finally {
      this.sectionScroll = null;
    }
  }

  // GET User Profile Detais
  getUserProfileDetails() {
    this.userProfileDetails = this.userService.get();
    this.contactOraFormBuilder();
    if(this.userProfileDetails['userVsTypes'].length > 0){
      if(this.userProfileDetails['userVsTypes'].length == 1){
        if(parseInt(this.userProfileDetails['userVsTypes'][0].userType.userTypeId) == 2){
          this.userRole = 2;
          this.router.navigateByUrl('/dashboard/bookings');
        }
      }else{
        this.userRole = 1;
      }
    }
  }

  // GET Language List
  getLanguageList() {
    this.srvProfile.getLanguageList().subscribe((res) => {
      if (res.responseCode === '200') {
          this.languageList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  // GET User Profile Detais
  getDomainList() {
    this.srvProfile.getDomainList().subscribe((res) => {
      if (res.responseCode === '200') {
          this.domainList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  // GET User Profile Detais
  getInterestList() {
    this.srvProfile.getInterestList().subscribe((res) => {
      if (res.responseCode === '200') {
          this.interestList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  getShortName(fullName) { 
    return fullName.split(' ').map(n => n[0]).join('');
  }

  // GET Purpose List
  getPurposeList() {
    this.propertyService.getContactPurposeList().subscribe((res) => {
      if (res.responseCode === '200') {
          this.purposeList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  onSubmitContactOraForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactOraForm.invalid) {
        return;
    }
    
    this.loading = true;
    const contactFormData =  this.contactOraForm.value;
    this.propertyService.contactOraDetails(contactFormData).subscribe((responseData) => {
      console.log('responseData', responseData);
      this.loading = false;
    }, errorData => {
      console.log('error', errorData);
      this.loading = false;
      if (errorData && errorData.status === 400) {
        // this.errorMessage = errorData.error.responseMessage;
      }
    });

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactOraForm.value))
  }

}
