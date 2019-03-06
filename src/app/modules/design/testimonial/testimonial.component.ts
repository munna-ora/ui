import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2
  };
  carouselItems = [{
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }, {
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }, {
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }, {
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }, {
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }, {
    img: 'testiuser1.png',
    name: 'Gourav Saxena',
    desc: '	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec non ex sagittis, pellentesque lorem ac, tempor enim. Aenean facilisis accumsan molestie. Nam euismod lacinia lectus, in vestibulum massa.',
    date: '24 Dec. 2018'
  }];

  constructor() { }

  ngOnInit() {
  }

}
