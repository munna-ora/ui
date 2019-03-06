import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../../services/apis/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, AfterViewInit {

  languageList = [];
  LanguageSelectedItems = [];
  interestList = [];
  interestSelectedItems = [];
  dropdownSettings = {};
  propertyList = [];
  toiletryList = [];
  // Chart Config
  Highcharts = Highcharts;

// total days
  totaldays;

  revenueLineChart = {
    chart: {
      type: 'line',
      backgroundColor: '#f5f6fa'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    plotOptions: {
      line: {
      }
    },
    series: [{
      name: 'Property - ORA9122522',
      data: [7000, 6000, 9000, 14000, 18000, null, null, null, null, null, null, null]
    }, {
      name: 'Property - ORA9122966',
      data: [3000, 4000, 5000, 8000, 11000, 15000, 17000, 16000, 14000, 10000, 6000, 4000]
    }, {
      name: 'Property - ORA9122865',
      data: [null, 5000, 6000, 7000, 10000, 14000, 15000, 15000, 13000, 10000, 5000, 3000]
    }, {
      name: 'Property - ORA9122108',
      data: [null, null, null, null, 50000, 7000, 10000, 12000, 13000, 10000, 5000, 3000]
    }],
     
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  revenueBarChart = {
    chart: {
      type: 'column',
      backgroundColor: '#f5f6fa',
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['ORA9122522', 'ORA9122865', 'ORA9122966', 'ORA9122108']
    },
    credits: {
        enabled: false
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    series: [{
        name: 'Pending amount',
        data: [28000, 15000, 30000, 68000]
    }, {
        name: 'Realized amount ',
        data: [50000, 7000, 40000, 94000]
    }]
  };

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };
  

  constructor(
    private modalService: NgbModal,
    private srvProperty: PropertyService,
    private cdr: ChangeDetectorRef
    ){
    this.populatePropertyList();
  }

  openModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup' });
  }

  openBookingModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup booking-modal' });
  }
  openAddPropertyModal(content) {
    this.modalService.open(content, { windowClass: 'modal-popup add-property-modal', centered: true});
  }

  ngOnInit() {
    this.totaldays = 31;
    this.languageList = [
      { item_id: 1, item_text: 'English' },
      { item_id: 2, item_text: 'Hindi' },
      { item_id: 3, item_text: 'Bengali' },
      { item_id: 4, item_text: 'Panjabi' },
      { item_id: 5, item_text: 'Telegu' },
      { item_id: 6, item_text: 'Tamil' },
      { item_id: 7, item_text: 'Urdhu' },
      { item_id: 8, item_text: 'Malayalam' }
    ];
    this.LanguageSelectedItems = [
      { item_id: 1, item_text: 'English' },
      { item_id: 2, item_text: 'Hindi' }
    ];

    this.interestList = [
      { item_id: 1, item_text: 'Travelling' },
      { item_id: 2, item_text: 'Playing guiter' },
      { item_id: 3, item_text: 'Listening musics' },
      { item_id: 4, item_text: 'Gurdaning' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  populatePropertyList() {
    this.srvProperty.getHostPropertyList().subscribe((res) => {
     if (res.responseCode === '200') {
        this.propertyList = res.responseBody;
     }
   }, error => {
     console.log('error', error);
   });
  }

  fetchToiletry(){
    this.srvProperty.fetchToiletry({}).subscribe((res) => {
      if (res.responseCode === '200') {
         this.toiletryList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }

  // 
  daysArray(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
