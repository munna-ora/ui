import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { TestimonialService } from '../../../services/apis/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  testimonialList: Array<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };
  constructor( private srvTestimonial: TestimonialService) {
    this.testimonialList = [];
    this.getTestimonailList();
   }

  ngOnInit() {
  }
  getTestimonailList() {
    this.srvTestimonial.getTestimonial().subscribe((res) => {
     console.log('getTestimonial data', res);
     if (res.responseCode === '200') {
       this.testimonialList = res.responseBody;
     }
   }, error => {
     console.log('error', error);
   });
 }

}
