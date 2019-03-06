import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-host-listing',
  templateUrl: './host-listing.component.html',
  styleUrls: ['./host-listing.component.scss']
})
export class HostListingComponent implements OnInit {
  
  specialExperienceList = [];
  specialExperience = [];

  specialitiesList = [];
  specialities = [];

  amenitiesList = [];
  amenities = [];

  dropdownSettings = {};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.specialExperienceList = [
        { item_id: 1, item_text: 'Exp 1' },
        { item_id: 2, item_text: 'Exp 2' },
        { item_id: 3, item_text: 'Exp 3' },
        { item_id: 4, item_text: 'Exp 4' },
        { item_id: 5, item_text: 'Exp 5' },
        { item_id: 6, item_text: 'Exp 6' },
        { item_id: 7, item_text: 'Exp 7' },
        { item_id: 8, item_text: 'Exp 8' }
    ];
    this.specialExperience = [];
    
    this.specialitiesList = [
      { item_id: 1, item_text: 'Specialities 1' },
      { item_id: 2, item_text: 'Specialities 2' },
      { item_id: 3, item_text: 'Specialities 3' },
      { item_id: 4, item_text: 'Specialities 4' },
      { item_id: 5, item_text: 'Specialities 5' },
      { item_id: 6, item_text: 'Specialities 6' },
      { item_id: 7, item_text: 'Specialities 7' },
      { item_id: 8, item_text: 'Specialities 8' }
    ];
    this.specialExperience = [];
    
    this.amenitiesList = [
      { item_id: 1, item_text: 'Amenities 1' },
      { item_id: 2, item_text: 'Amenities 2' },
      { item_id: 3, item_text: 'Amenities 3' },
      { item_id: 4, item_text: 'Amenities 4' },
      { item_id: 5, item_text: 'Amenities 5' },
      { item_id: 6, item_text: 'Amenities 6' },
      { item_id: 7, item_text: 'Amenities 7' },
      { item_id: 8, item_text: 'Amenities 8' }
    ];
    this.specialities = [];

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

  scroll(el) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  checkInTime = {hour: 10, minute: 30};
  checkOutTime = {hour: 12, minute: 30};
  meridian = true;

  openModal(content) {
    // , size: 'md'
      this.modalService.open(content, { windowClass: 'modal-popup', centered: true });
  }
}
