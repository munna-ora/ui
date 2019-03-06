import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService} from '../../services/shared.service';
import { PropertyService } from '../../services/apis/property.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookmarkPopupComponent }  from '../../shared/components/bookmark-popup/bookmark-popup.component';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnDestroy {
  
  @ViewChild(BookmarkPopupComponent ) bookmarkComp: BookmarkPopupComponent ; 

  public checkboxGroupForm: FormGroup;
  propertyList: Array<any>;
  ratingsFliterList: Array<any>;
  amenitiesFliterList: Array<any>;
  budgetsFliterList: Array<any>;
  mapShowHide  = true;
  propertyTypes: Array<any>;
  searchPropertyType: string;
  Object = Object;
  sub: any;
  searchObj: object;
  selectedPropertyTypeName: string;
  filterBy: string;
  selectedFilter: object;
  loading: boolean;
  shareObj: object;

  constructor(
    private formBuilder: FormBuilder,
    private sharedSrv: SharedService,
    private srvProperty: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    ) {
      this.loading = false;
      this.propertyList = [];
      this.ratingsFliterList = [];
      this.amenitiesFliterList = [];
      this.budgetsFliterList = [];
      this.propertyTypes = [];
      this.filterBy = 'rating';
      this.getPropertyTypes();
      this.getMasterAmenitiesList();
      this.getMasterBudgetsList();
      this.getMasterRatingsList();
    }

  ngOnInit() {
    this.checkboxGroupForm = this.formBuilder.group({
      excellent: false,
      very_good: false,
      good: false,
      all_of_kolkata: true,
      saltlake: false,
      parkstreet: false,
      all_facilities: false,
      airconditioner: false,
      wifi: false,
      television: false,
      under_299: false,
      under_299_999: false,
      under_999_1499: true,
      under_1499_1999: false,

      popularity: false,
      price_lowest_first: false,
      couples_frindly: false,
      pet_friendly: false
    });
    const sharedHomeSearchData = this.sharedSrv.sharedHomeSearchData;
    const isSearchObjEmpty = !Object.keys(sharedHomeSearchData).length;
    if (!isSearchObjEmpty) {
      this.getPropertyList(sharedHomeSearchData);
      this.searchObj = sharedHomeSearchData;
    } else {
      const searchObj = JSON.parse(localStorage.getItem('searchObj'));
      this.getPropertyList(searchObj);
      this.searchObj = searchObj;
    }
    this.sub =  this.route.queryParams.subscribe(params => { console.log(params); });
  }
  
  setPropertyTypeName(propertyTypeId) {
    const propertyTypes = this.propertyTypes;
    const filteredArray = propertyTypes.filter(function(itm) {
      return itm.propertyTypeId === propertyTypeId;
    });
    console.log(filteredArray);
     this.selectedPropertyTypeName = filteredArray.length ? filteredArray[0].name : '';
  }

  getPropertyList(params: any) {
    this.loading = true;
    this.setPropertyTypeName(params.propertyTypeId);
    this.srvProperty.searchProperties(params).subscribe((res) => {
      this.loading = false;
      console.log('searchProperties data', res);
      if (res.responseCode === '200') {
          this.propertyList = res.responseBody;
          console.log(this.propertyList);
          let sortedList = []; 
          sortedList = this.propertyList.filter(task => Math.round(Number(task.longitude))  == Math.round(Number(this.searchObj['longitude'])));
          this.propertyList = sortedList;
      }
    }, error => {
      this.loading = false;
      console.log('error', error);
    });
  }

  getMasterRatingsList() {
    this.srvProperty.getMasterRatingsList({}).subscribe((res) => {
      console.log('getMasterRatingsList data', res);
      if (res.responseCode === '200') {
          this.ratingsFliterList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  getMasterAmenitiesList() {
    this.srvProperty.getMasterAmenitiesList({}).subscribe((res) => {
      console.log('getMasterAmenitiesList data', res);
      if (res.responseCode === '200') {
          this.amenitiesFliterList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  getMasterBudgetsList() {
    this.srvProperty.getMasterBudgetsList({}).subscribe((res) => {
      console.log('getMasterBudgetsList data', res);
      if (res.responseCode === '200') {
          this.budgetsFliterList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  getPropertyTypes() {
    this.srvProperty.getPropertyTypes({}).subscribe((res) => {
      console.log('getPropertyTypes data', res);
      if (res.responseCode === '200') {
        this.propertyTypes =  res.responseBody;
        this.setPropertyTypeName(this.searchObj['propertyTypeId']);
      }
    }, error => {
      console.log('error', error);
    });
  }

  getPropertyTypeName(propertyTypeId: number) {
    const propertyTypes = this.propertyTypes;
    const propertyType =  propertyTypes.filter(x => x.propertyTypeId === propertyTypeId)[0];
    this.searchPropertyType = propertyType.name;
  }

  searchFormSubmitted(searchData) {
    const filterSelectedData = this.selectedFilter;
    const searchObj = searchData;
    this.searchObj = searchData;
    const merged = {...searchObj, ...filterSelectedData};
    this.getPropertyList(merged);
  }

  navigatePropertyDetails(propertyId) {
    const searchObj = JSON.parse(localStorage.getItem('searchObj'));
    searchObj['propertyId'] = propertyId;
    localStorage.setItem('searchObj', JSON.stringify(searchObj));
    this.sharedSrv.sharedHomeSearchData = searchObj;
    this.router.navigate(['/properties/property-details'], { queryParams: searchObj });
  }

  filterSelected(filterSelectedData) {
    this.selectedFilter = filterSelectedData;
    const searchObj = this.searchObj;
    const merged = {...searchObj, ...filterSelectedData};
    this.getPropertyList(merged);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
