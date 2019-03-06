import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStorageProvider } from '../../../services/storage/user-storage.service';
import { PropertyService } from '../../../services/apis/property.service';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-bookmark-popup',
  templateUrl: './bookmark-popup.component.html',
  styleUrls: ['./bookmark-popup.component.scss']
})
export class BookmarkPopupComponent implements OnInit, AfterViewInit {
  // @Input() bookmarkObj: object;
  bookmarkObj: object;
  userInfo: any;
  isLogined = false;

  constructor(
    private modalService: NgbModal,
    private userStorage: UserStorageProvider,
    private srvProperty: PropertyService,
    private SharedSrv: SharedService
    ) {
      this.userInfo = this.userStorage.get();
      this.bookmarkObj = JSON.parse(localStorage.getItem('bookmarkObj'));
      // if(this.bookmarkObj){
      //   this.callBookmarkFunction(this.bookmarkObj);
      // }
  }

  ngOnInit() {}

  ngAfterViewInit(){}

  openBookmarkModal(content) {
    this.modalService.open(content, { windowClass: 'modal-popup', size: 'sm', centered: true });
    // console.log(this.bookmarkObj);
  }

  callBookmarkFunction(property){
    this.bookmarkObj = property;
    // console.log(this.bookmarkObj);
    if(this.bookmarkObj['isBookmark']){
      this.SharedSrv.showToastMessage("Property have already saved.", '', 'warning');
    }else{
      if (this.userInfo) {
        this.isLogined = true;
        document.getElementById("openConfirmationBtn").click();
      }else{
        localStorage.setItem('bookmarkObj', JSON.stringify(this.bookmarkObj));
        document.getElementById("loginBtn").click();
      }
    }
  }

  confirmBookmarkFunc(){
    const paramObj = {
      userToken: this.userInfo['userToken'],
      property: {
        propertyId: this.bookmarkObj['propertyId']
      }
    }
    this.addBookmark(paramObj);
  }

  // Save Bookmark
  addBookmark(params: any) {
    this.srvProperty.addBookmark(params).subscribe((res) => {
        if (res.responseCode === '200') {
            this.SharedSrv.showToastMessage(res.responseBody, 'Success', 'success');
        }
    }, error => {
        console.log('error', error);
        this.SharedSrv.showToastMessage(error, 'Error', 'error');
    });
  }
}
