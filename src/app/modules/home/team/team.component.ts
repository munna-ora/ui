import { Component, OnInit } from '@angular/core';
import { Meta, Title  } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
    ) {
    
      // ADD PAGE TITLE & METATAGS START
      this.meta.addTags([
        {name: 'description', content: 'Mr. Saransh Kumar and Namita Nayak, the force behind Orastays, believe the road to success isn’t easy to navigate and started the company in 2013.'},
        {name: 'author', content: ''},
        {name: 'keywords', content: ''}
      ]);
      this.title.setTitle('The team making affordable homestays possible in India');
      // END
  }

  ngOnInit() {
  }

}
