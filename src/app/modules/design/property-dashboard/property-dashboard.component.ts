import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.scss']
})
export class PropertyDashboardComponent implements OnInit {
    
  languageList = [];
  LanguageSelectedItems = [];
  interestList = [];
  interestSelectedItems = [];
  dropdownSettings = {};

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
  carouselItems = [{
    img: 'prop_1.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },{
    img: 'prop_2.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },{
    img: 'prop_3.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },{
    img: 'prop_1.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },{
    img: 'prop_2.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },{
    img: 'prop_3.jpg',
    name: 'ORA9122522, Amadpur',
    desc: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit. Curabitur eget pharetra ...',
    location: 'Saltlake, Kolkata'
  },];

  constructor(private modalService: NgbModal) { }
  openModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup' });
  }

  ngOnInit() {
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

  // Chart Config
  Highcharts = Highcharts;
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
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

    }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

    }]
  };

}
