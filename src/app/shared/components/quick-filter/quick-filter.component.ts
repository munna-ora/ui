import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService} from '../../../services/shared.service';
import { PropertyService } from '../../../services/apis/property.service';
import { FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-quick-filter',
  templateUrl: './quick-filter.component.html',
  styleUrls: ['./quick-filter.component.scss']
})
export class QuickFilterComponent implements OnInit {

  @Input() selectedPropertyTypeName: string;
  @Output() filterSelected  = new EventEmitter<any>();
  ratingsFliterList: Array<any>;
  amenitiesFliterList: Array<any>;
  budgetsFliterList: Array<any>;
  Object = Object;
  ratingsfilterForm: FormGroup;
  amenitiesFilterForm: FormGroup;
  budgetFilterForm: FormGroup;

  constructor(
    private sharedSrv: SharedService,
    private srvProperty: PropertyService,
    private formBuilder: FormBuilder
    ) {
      this.ratingsFliterList = [];
      this.amenitiesFliterList = [];
      this.budgetsFliterList = [];
      this.getMasterAmenitiesList();
      this.getMasterBudgetsList();
      this.getMasterRatingsList();
    }

  ngOnInit() {
    this.ratingsfilterForm = this.formBuilder.group({
      ratings: []
    });
    this.amenitiesFilterForm = this.formBuilder.group({
      amenities: []
    });
    this.budgetFilterForm = this.formBuilder.group({
      budgets: []
    });
  }

  getMasterRatingsList() {
    this.srvProperty.getMasterRatingsList({}).subscribe((res) => {
      console.log('getMasterRatingsList data', res);
      if (res.responseCode === '200') {
          // this.ratingsFliterList = res.responseBody;
          this.ratingsFliterList =  Object.entries(res.responseBody).map(([key, value]) => ({key, value}));
          const controls = this.ratingsFliterList.map(c => new FormControl(false));
          this.ratingsfilterForm = this.formBuilder.group({
            ratings: new FormArray(controls)
          });
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
          const controls = this.amenitiesFliterList.map(c => new FormControl(false));
          this.amenitiesFilterForm = this.formBuilder.group({
            amenities: new FormArray(controls)
          });
      }
    }, error => {
      console.log('error', error);
    });
  }
  getMasterBudgetsList() {
    this.srvProperty.getMasterBudgetsList({}).subscribe((res) => {
      console.log('getMasterBudgetsList data', res);
      if (res.responseCode === '200') {
          // this.budgetsFliterList = res.responseBody;
          this.budgetsFliterList =  Object.entries(res.responseBody).map(([key, value]) => ({key, value}));
          const controls = this.budgetsFliterList.map(c => new FormControl(false));
          this.budgetFilterForm = this.formBuilder.group({
            budgets: new FormArray(controls)
          });
      }
    }, error => {
      console.log('error', error);
    });
  }
  filterChecked() {
    const ratings = this.ratingsfilterForm.value.ratings
      .map((v, i) => v ? this.ratingsFliterList[i].key : null)
      .filter(v => v !== null);

    const amenities = this.amenitiesFilterForm.value.amenities
      .map((v, i) => v ? this.filterAmenitiesReturn(this.amenitiesFliterList[i]) : null)
      .filter(v => v !== null);

    const budgets = this.budgetFilterForm.value.budgets
      .map((v, i) => v ? this.budgetsFliterList[i].key : null)
      .filter(v => v !== null);

      const filters = {
        amenities: amenities,
        budgets : budgets,
        ratings: ratings
      };
      console.log(filters);
      this.filterSelected.emit(filters);
  }
   filterAmenitiesReturn(obj) {
    return {aminitiesId: obj.aminitiesId};
   }

}
