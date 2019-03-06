import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {
  @Input() shareObj: object;
  constructor() { }

  ngOnInit() {
    console.log(this.shareObj);
  }

}
