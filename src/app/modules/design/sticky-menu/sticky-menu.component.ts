import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.scss'],
  providers: [NgbDropdownConfig],
})
export class StickyMenuComponent implements OnInit, AfterViewInit {

  sectionScroll: string;
  constructor(
    config: NgbDropdownConfig,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.doScrollToDiv();
      this.sectionScroll = null;
    });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  scrollToDiv(page, dest) {
    this.sectionScroll = dest;
    this.router.navigate([page], {fragment: dest});
   // this.doScrollToDiv();
  }

  doScrollToDiv() {
    if (!this.sectionScroll && this.sectionScroll == null) {
      return;
    }
    try {
      console.log(this.sectionScroll);
      const element = document.getElementById(this.sectionScroll);
      element.scrollIntoView({behavior: 'smooth'});
    }
    finally {
      this.sectionScroll = null;
    }
  }

}
