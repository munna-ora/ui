import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input() propertyTypes: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
