import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  checkInTime = {hour: 10, minute: 30};
  checkOutTime = {hour: 12, minute: 30};
  meridian = true;

  spaceRules = ['Couple Friendly', 'Pet Friendly', 'Smoking', 'Alchohol'];
  specialExperience = ['Spa', 'Musical Instrument', 'Yoga Center'];
  specialities = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  amenities = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  accordianIds = ['panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5', 'panel-6'];
  constructor() { }

  ngOnInit() {
  }
}
