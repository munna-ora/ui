import { Component, OnInit } from '@angular/core';
import { Meta, Title  } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
    ) {
    
      // ADD PAGE TITLE & METATAGS START
      this.meta.addTags([
        {name: 'description', content: 'Each member in Orastays is safe and secure. To maintain transparency and security, Privacy Policy protects all content and information provided to us by users. '},
        {name: 'author', content: ''},
        {name: 'keywords', content: ''}
      ]);
      this.title.setTitle('Orastays supports community trust, faith and security');
      // END
  }

  ngOnInit() {
  }

}
