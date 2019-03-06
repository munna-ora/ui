import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
    as_leftNavDisabled = false;
    as_rightNavDisabled = false;
    ls_leftNavDisabled = false;
    ls_rightNavDisabled = false;

    // Ameni Slider
    @ViewChild('ameniSlider', {read: DragScrollComponent}) as: DragScrollComponent;
  
    moveLeft_as() {
      this.as.moveLeft();
    }
  
    moveRight_as() {
      this.as.moveRight();
    }
    leftBoundStat_as(reachesLeftBound: boolean) {
        this.as_leftNavDisabled = reachesLeftBound;
    }

    rightBoundStat_as(reachesRightBound: boolean) {
        this.as_rightNavDisabled = reachesRightBound;
    }

    // Location Slider
    @ViewChild('locationSlider', {read: DragScrollComponent}) ls: DragScrollComponent;
    moveLeft_ls() {
        this.ls.moveLeft();
    }

    moveRight_ls() {
        this.ls.moveRight();
    }
    leftBoundStat_ls(reachesLeftBound: boolean) {
        this.ls_leftNavDisabled = reachesLeftBound;
    }

    rightBoundStat_ls(reachesRightBound: boolean) {
        this.ls_rightNavDisabled = reachesRightBound;
    }

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private modalService: NgbModal) { }

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
                small: 'assets/images/property-details/gallery/big-slide-1.png',
                medium: 'assets/images/property-details/gallery/big-slide-1.png',
                big: 'assets/images/property-details/gallery/big-slide-1.png'
            },
            {
                small: 'assets/images/property-details/gallery/big-slide-1.png',
                medium: 'assets/images/property-details/gallery/big-slide-1.png',
                big: 'assets/images/property-details/gallery/big-slide-1.png'
            },
            {
                small: 'assets/images/property-details/gallery/big-slide-1.png',
                medium: 'assets/images/property-details/gallery/big-slide-1.png',
                big: 'assets/images/property-details/gallery/big-slide-1.png'
            }
        ];
    }

    openModal(content) {
        // , size: 'md'
        this.modalService.open(content, { windowClass: 'modal-popup host-details' });
    }

}
