import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
  carouselItems = [{
    img: 'award-1.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },{
    img: 'award-2.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },{
    img: 'award-3.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },{
    img: 'award-1.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },{
    img: 'award-2.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },{
    img: 'award-3.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel erat et ligula'
  },];
  
  constructor(private cdr: ChangeDetectorRef) {
    // customize default values of dropdowns used by this component tree
    // config.placement = 'top-left';
    // config.autoClose = false;
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  scrollToDiv(el) {
    el.scrollIntoView({behavior: 'smooth'});
    // window.scrollTo(el.yPosition)
  }
}
