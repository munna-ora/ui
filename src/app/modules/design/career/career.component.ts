import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit(): void {

      this.galleryOptions = [
          {
              width: '100%',
              height: '100%',
              thumbnailsColumns: 4,
              imageAnimation: NgxGalleryAnimation.Slide,
              imageAutoPlay: true,
              imageAutoPlayInterval: 5000,
              imageInfinityMove: true,
              thumbnails: false
          },
          // max-width 800
          {
              breakpoint: 800,
              width: '100%',
              height: '600px',
              imagePercent: 80,
              thumbnailsPercent: 20,
              thumbnailsMargin: 20,
              thumbnailMargin: 20
          },
          // max-width 400
          {
              breakpoint: 400,
              preview: false
          }
      ];

      this.galleryImages = [
          {
              small: 'assets/images/career/carrer_banner_1.png',
              medium: 'assets/images/career/carrer_banner_1.png',
              big: 'assets/images/career/carrer_banner_1.png'
          },
          {
              small: 'assets/images/career/carrer_banner_1.png',
              medium: 'assets/images/career/carrer_banner_1.png',
              big: 'assets/images/career/carrer_banner_1.png'
          },
          {
              small: 'assets/images/career/carrer_banner_1.png',
              medium: 'assets/images/career/carrer_banner_1.png',
              big: 'assets/images/career/carrer_banner_1.png'
          }
      ];
  }

}
