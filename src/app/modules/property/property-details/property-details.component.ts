import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService} from '../../../services/shared.service';
import { PropertyService } from '../../../services/apis/property.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

    propertyDetails: object;
    propertyId: number;
    searchObj: object;
    bookStayObj: object;
    as_leftNavDisabled = false;
    as_rightNavDisabled = false;
    loading: boolean;
    roomCheckBox: any;
    //   ls_leftNavDisabled = false;
    //   ls_rightNavDisabled = false;

    // Ameni Slider
    @ViewChild('ameniSlider', {read: DragScrollComponent}) as: DragScrollComponent;
    // Location Slider
    //   @ViewChild('locationSlider', {read: DragScrollComponent}) ls: DragScrollComponent;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    constructor(
        private modalService: NgbModal,
        private sharedSrv: SharedService,
        private srvProperty: PropertyService,
        private router: Router
        ) {
            this.loading = false;
            this.roomCheckBox = [];
        }


    ngOnInit(): void {
        const sharedHomeSearchData = this.sharedSrv.sharedHomeSearchData;
        const isSearchObjEmpty = !Object.keys(sharedHomeSearchData).length;
        if (!isSearchObjEmpty) {
        this.getPropertyDetails(sharedHomeSearchData);
        this.searchObj = sharedHomeSearchData;
        this.propertyId = sharedHomeSearchData['propertyId'];
        } else {
        const searchObj = JSON.parse(localStorage.getItem('searchObj'));
        this.getPropertyDetails(searchObj);
        this.searchObj = searchObj;
        this.propertyId = searchObj['propertyId'];
        }

        this.galleryOptions = [
            {   
                width: '100%',
                height: '100%',
                "imageArrows": true, 
                "imageSwipe": true, 
                "thumbnailsArrows": false, 
                "thumbnailsSwipe": true, 
                "previewSwipe": true 
            },
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
                small: 'assets/images/property-details/gallery/big-slide-2.jpg',
                medium: 'assets/images/property-details/gallery/big-slide-2.jpg',
                big: 'assets/images/property-details/gallery/big-slide-2.jpg'
            },
            {
                small: 'assets/images/property-details/gallery/big-slide-3.jpg',
                medium: 'assets/images/property-details/gallery/big-slide-3.jpg',
                big: 'assets/images/property-details/gallery/big-slide-3.jpg'
            },
            {
                small: 'assets/images/property-details/gallery/big-slide-4.jpg',
                medium: 'assets/images/property-details/gallery/big-slide-4.jpg',
                big: 'assets/images/property-details/gallery/big-slide-4.jpg'
            }
        ];
    }
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

    openModal(content) {
        // , size: 'md'
        this.modalService.open(content, { windowClass: 'modal-popup host-details' });
    }

    getPropertyDetails(params: any) {
        this.loading = true;
        this.srvProperty.getPropertyDetails(params).subscribe((res) => {
            
            if (res.responseCode === '200') {
                this.propertyDetails = res.responseBody;
                // this.bookStayObj = this.searchObj;
                this.bookStayObj = Object.assign({}, this.searchObj);
                this.bookStayObj['totalAmount'] = this.propertyDetails['totalAmount'];
                this.bookStayObj['amountPayable'] = this.propertyDetails['amountPayable'];
                
                this.galleryImages = [];
                let imgObj = {
                    small: this.propertyDetails['coverImageUrl'],
                    medium: this.propertyDetails['coverImageUrl'],
                    big: this.propertyDetails['coverImageUrl'],
                }
                this.galleryImages.push(imgObj);
                if(this.propertyDetails['propertyVsImages']){
                    for(let i=0; i< this.propertyDetails['propertyVsImages'].length; i++){
                        let imgObj = {
                            small: this.propertyDetails['propertyVsImages'][i].imageURL,
                            medium: this.propertyDetails['propertyVsImages'][i].imageURL,
                            big: this.propertyDetails['propertyVsImages'][i].imageURL,
                        }
                        this.galleryImages.push(imgObj);
                    }
                }
                let rooms = [];
                for(let i=0; i< this.propertyDetails['rooms'].length; i++){
                    if(this.propertyDetails['rooms'][i].isSelected == 'true'){
                        let roomObj = {
                            oraRoomName: this.propertyDetails['rooms'][i]['oraRoomName'],
                            noOfGuest: this.propertyDetails['rooms'][i]['noOfGuest'],
                            commission: this.propertyDetails['rooms'][i]['noOfGuest'],
                            oraPercentage: this.propertyDetails['rooms'][i]['oraPercentage'],
                            cotPrice: this.propertyDetails['rooms'][i]['cotPrice'],
                            oraFinalPrice: this.propertyDetails['rooms'][i]['oraFinalPrice'],
                            oraPrice: this.propertyDetails['rooms'][i]['oraPrice'],
                        }
                        rooms.push(roomObj);
                    }
                }
                this.bookStayObj['rooms'] = rooms;
                console.log(this.bookStayObj);
                this.loading = false;
            }
        }, error => {
            this.loading = false;
            console.log('error', error);
        });
    }

    searchFormSubmitted(searchObj) {
        searchObj['propertyId'] = this.propertyId;
        localStorage.setItem('searchObj', JSON.stringify(searchObj));
        this.sharedSrv.sharedHomeSearchData = searchObj;
        this.getPropertyDetails(searchObj);
        // this.router.navigate(['/properties/property-details'], { queryParams: this.searchObj });
    }

    arrayNum(number) {
        return Array(parseInt(number));
    }

    bookYourStay() {
        localStorage.setItem('bookingSearchObj', JSON.stringify(this.bookStayObj));
        this.sharedSrv.sharedBookingSearchdata = this.bookStayObj;
        this.router.navigate(['/properties/booking'], { queryParams: this.bookStayObj });
    }

    // calculate number of days
    calculateDate(date1, date2){
        date1 = new Date(date1);
        date2 = new Date(date2);
        let diffc = date1.getTime() - date2.getTime();
        let days = Math.round(Math.abs(diffc/(1000*60*60*24)));
        return days;
    }

    // Add or remove romms
    roomSelectedRoom(roomObj, isChecked){
        if(isChecked) {
            let Obj = {
                oraRoomName: roomObj['oraRoomName'],
                noOfGuest: roomObj['noOfGuest'],
                commission: roomObj['noOfGuest'],
                oraPercentage: roomObj['oraPercentage'],
                cotPrice: roomObj['cotPrice'],
                oraFinalPrice: roomObj['oraFinalPrice'],
                oraPrice: roomObj['oraPrice'],
            }
            roomObj.isSelected = 'true';
            this.bookStayObj['rooms'].push(Obj);
        } else {
            let index = this.bookStayObj['rooms'].findIndex(x => x.oraRoomName == roomObj.oraRoomName);
            this.bookStayObj['rooms'].splice(index, 1);
            roomObj.isSelected = 'false';
        }
        let noOfDays = this.calculateDate(this.bookStayObj['checkInDate'], this.bookStayObj['checkOutDate']);
        this.calculateBookStayPrice(noOfDays);
    }

    // Add extra bed
    addExtraBed(roomObj, value, noOfDays){
        let index = this.bookStayObj['rooms'].findIndex(x => x.oraRoomName == roomObj.oraRoomName);
        this.bookStayObj['rooms'][index]['numOfCot'] = value;
        this.calculateBookStayPrice(noOfDays);
    }

    // Calculate Final Book your stay object
    calculateBookStayPrice(noOfDays){
        let oraPrice = 0, oraFinalPrice = 0;
        for(let i=0; i<this.bookStayObj['rooms'].length;i++){
            let room_oraPrice = parseInt(this.bookStayObj['rooms'][i]['oraPrice']);
            let room_oraFinalPrice = parseInt(this.bookStayObj['rooms'][i]['oraFinalPrice']);
            let a = parseInt(this.bookStayObj['rooms'][i]['cotPrice']) * (this.bookStayObj['rooms'][i]['numOfCot'] ? parseInt(this.bookStayObj['rooms'][i]['numOfCot']) : 0) * noOfDays;
            let b = a * parseInt(this.bookStayObj['rooms'][i]['oraPercentage']) / 100;
            let c = b + a;
            room_oraPrice = room_oraPrice + c;
            oraPrice = oraPrice + room_oraPrice;
            let d = a * parseInt(this.bookStayObj['rooms'][i]['commission']) / 100;
            let e = c - d;
            room_oraFinalPrice = room_oraFinalPrice + e;
            oraFinalPrice = oraFinalPrice + room_oraFinalPrice;
        }
        this.bookStayObj['totalAmount'] = oraPrice;
        this.bookStayObj['amountPayable'] = oraFinalPrice;
    }
}
