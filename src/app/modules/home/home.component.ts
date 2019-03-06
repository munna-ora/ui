import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig, NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialService } from '../../services/apis/testimonial.service';
import { PropertyService } from '../../services/apis/property.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService} from '../../services/shared.service';
import { Router } from '@angular/router';
import { BannerService } from '../../services/apis/banner.service';
import { Meta, Title  } from '@angular/platform-browser';
import { BookmarkPopupComponent }  from '../../shared/components/bookmark-popup/bookmark-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('dpHotel') dpHotel: NgbInputDatepicker;
  @ViewChild('dpFlight') dpFlight: NgbInputDatepicker;

  @ViewChild(BookmarkPopupComponent ) bookmarkComp: BookmarkPopupComponent ; 

  // private bookmarkComponent: BookmarkPopupComponent;

  hNoOfAdult = 0;
  hNoOfChild = 0;
  noOfRooms = 0;
  hoveredDate: NgbDate;
  h_fromDate: NgbDate;
  h_toDate: NgbDate;
  f_fromDate: NgbDate;
  f_toDate: NgbDate;
  onFirstSelection = true;
  testimonialList: Array<any>;
  bannerList: Array<any>;
  propertyTypes: Array<any>;
  propertyList: Array<any>;
  shareObj: object;
  bookmarkObj: object;

  windowHeight: number;

  constructor(
    private calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    private srvTestimonial: TestimonialService,
    private srvBanner: BannerService,
    private srvProperty: PropertyService,
    private modalService: NgbModal,
    private sharedSrv: SharedService,
    private router: Router,
    private parserFormatter: NgbDateParserFormatter,
    private meta: Meta,
    private title: Title
    ) {
      // ADD PAGE TITLE & METATAGS START
      this.meta.addTags([
        {name: 'description', content: 'You need to experience India’s first standardized homestay booking with Orastyas to believe how wonderful and affordable it is.'},
        {name: 'author', content: ''},
        {name: 'keywords', content: ''}
      ]);
      this.title.setTitle('Orastays | Standardized Homestay in India');
      // END

      this.windowHeight = window.innerHeight;
      console.log("Height: " + this.windowHeight)
      this.h_fromDate = this.calendar.getToday();
      this.h_toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 3);

      this.f_fromDate = this.calendar.getToday();
      this.f_toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 3);

      const currentDate = new Date();
      config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
      config.maxDate = { year: 2020, month: 12, day: 31 };

      this.propertyList = [];
      this.bannerList = [];
      this.getTestimonailList();
      this.getPropertyTypes();
      this.getBannerList();
      this.bookmarkObj = {};
  }
  currentJustify = 'justified';
  // constructor() { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    console.log("Height: " + this.windowHeight)
  }

  onDateSelectionHotel(date: NgbDate) {
    if (!this.h_fromDate && !this.h_toDate) {
      this.h_fromDate = date;
    } else if (this.h_fromDate && !this.h_toDate) {
      this.h_toDate = date;
      this.dpHotel.close();
    } else {
      this.h_toDate = null;
      this.h_fromDate = date;
    }
  }
  onDateSelectionFlight(date: NgbDate) {
    if (!this.f_fromDate && !this.f_toDate) {
      this.f_fromDate = date;
    } else if (this.f_fromDate && !this.f_toDate) {
      this.f_toDate = date;
      this.dpFlight.close();
    } else {
      this.f_toDate = null;
      this.f_fromDate = date;
    }
  }

  // BANNER LIST
  getBannerList() {
    this.srvBanner.getBanner('HOME').subscribe((res) => {
     if (res.responseCode === '200') {
       this.bannerList = res.responseBody;
     }
    }, error => {
      console.log('error', error);
    });
  }

  // TESTIMONIAL LIST
  getTestimonailList() {
     this.srvTestimonial.getTestimonial().subscribe((res) => {
      console.log('getTestimonial data', res);
      if (res.responseCode === '200') {
        this.testimonialList = res.responseBody;
        if (this.testimonialList.length > 2) {
          this.testimonialList.length = 2;
        }
      }
    }, error => {
      console.log('error', error);
    });
  }

  getPropertyTypes() {
    this.srvProperty.getPropertyTypes({}).subscribe((res) => {
     console.log('getPropertyTypes data', res);
     if (res.responseCode === '200') {
       this.propertyTypes = res.responseBody;
       for (let i = 0; i < this.propertyTypes.length; i++) {
        this.propertyList[this.propertyTypes[i].propertyTypeId] = [];
       }
       if (this.propertyTypes.length > 0) {
        this.getPropertyList(this.propertyTypes[0]);
       }
     }
   }, error => {
     console.log('error', error);
   });
 }

  getPropertyList(propertyType: any) {
    if (this.propertyList[propertyType.propertyTypeId].length === 0) {
      this.srvProperty.getPropertyByType({propertyTypeId: propertyType.propertyTypeId}).subscribe((res) => {
        if (res.responseCode === '200') {
          this.propertyList[propertyType.propertyTypeId] = res.responseBody;
          console.log(this.propertyList);
        }
      }, error => {
        console.log('error', error);
      });
    }
  }

  showMoreProperty(propertyObj, propertyTypeId, propertyId) {
    const searchParam = {};
    const checkInDate = this.calendar.getToday();
    const checkOutDate = this.calendar.getNext(this.calendar.getToday(), 'd', 3);
    searchParam['checkInDate'] = this.parserFormatter.format(checkInDate);
    searchParam['checkOutDate'] =  this.parserFormatter.format(checkOutDate);
    searchParam['latitude'] = + propertyObj.latitude;
    searchParam['longitude'] = + propertyObj.longitude;
    searchParam['location'] = propertyObj.address;
    searchParam['location'] = propertyObj.address;
    searchParam['propertyTypeId'] = propertyTypeId;
    searchParam['stayType'] = 'PRIVATE';
    searchParam['rooms'] =  [{noOfGuest: 1, noOfChild: 0}];
    if(propertyId){
      searchParam['propertyId'] = propertyId;
      localStorage.setItem('searchObj', JSON.stringify(searchParam));
      this.sharedSrv.sharedHomeSearchData = searchParam;
      this.router.navigate(['/properties/property-details'], { queryParams: searchParam });
    }
    else{
      localStorage.setItem('searchObj', JSON.stringify(searchParam));
      this.sharedSrv.sharedHomeSearchData = searchParam;
      this.router.navigate(['/properties'], { queryParams: searchParam });
    }
  }

  getMyStyles(){
    let myStyles = {
      'width': '100%',
      'max-height': this.windowHeight + 'px'
      // 'height': (this.windowHeight - 76) + 'px'
    };
    return myStyles;
  }

  openModal(content) {
    // , size: 'md'
      this.modalService.open(content, { windowClass: 'modal-popup', centered: true });
  }
  openFilterModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup quick-filter-modal', centered: true });
  }
  openShareModal(content, property){
    this.shareObj = {
      property: property
    }
    this.modalService.open(content, { windowClass: 'modal-popup', centered: true });
  }

  getBookmark(property){
    this.bookmarkComp.callBookmarkFunction(property);
  }
}
