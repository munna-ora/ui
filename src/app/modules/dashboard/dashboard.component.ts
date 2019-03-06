import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // languageList = [];
  // LanguageSelectedItems = [];
  // interestList = [];
  // interestSelectedItems = [];
  // dropdownSettings = {};

  constructor(private modalService: NgbModal) { }
  openModal(content) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'modal-popup' });
  }

  ngOnInit() {
    // this.languageList = [
    //   { item_id: 1, item_text: 'English' },
    //   { item_id: 2, item_text: 'Hindi' },
    //   { item_id: 3, item_text: 'Bengali' },
    //   { item_id: 4, item_text: 'Panjabi' },
    //   { item_id: 5, item_text: 'Telegu' },
    //   { item_id: 6, item_text: 'Tamil' },
    //   { item_id: 7, item_text: 'Urdhu' },
    //   { item_id: 8, item_text: 'Malayalam' }
    // ];
    // this.LanguageSelectedItems = [
    //   { item_id: 1, item_text: 'English' },
    //   { item_id: 2, item_text: 'Hindi' }
    // ];

    // this.interestList = [
    //   { item_id: 1, item_text: 'Travelling' },
    //   { item_id: 2, item_text: 'Playing guiter' },
    //   { item_id: 3, item_text: 'Listening musics' },
    //   { item_id: 4, item_text: 'Gurdaning' }
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
  }

}
