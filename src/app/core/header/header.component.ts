import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { TestModalComponent } from '../../shared/components/test-modal/test-modal.component';
import { AuthComponent } from '../auth/auth.component';
import { UserStorageProvider } from '../../services/storage/user-storage.service';
import { AuthService } from '../../services/apis/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('comingSoonModalBtn') comingSoonModalBtn: ElementRef;

  currentJustify = 'justified';
  loginFormSelectedTab = 'loginTab';
  title = 'testing';
  userInfo: any;
  isLogined = false;
  navbarOpen = false;

  constructor(
    private modalService: NgbModal,
    private userStorage: UserStorageProvider,
    private authSrv: AuthService,
  ) {
      this.userInfo = this.userStorage.get();
      if (this.userInfo) {
        this.isLogined = true;
      }
    // customize default values of modals used by this component tree
    // config.backdrop = 'static';
    // config.keyboard = false;
    }
  ngOnInit() {
    console.log(this.userInfo);
  }
  oncloseModal(event: string) {
    console.log(event);

  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  beforeChange($event: NgbTabChangeEvent) {
    console.log('Changing tab', $event);
  }
  ngAfterViewInit() {
    // this.comingSoonModalBtn.nativeElement.click();
  }
  open(content, selectedTab) {
    // , size: 'md'
    this.modalService.open(content, { windowClass: 'login-section' });
    this.loginFormSelectedTab = selectedTab;
  }
  openComingSoon(content) {
    this.modalService.open(content, { windowClass: 'coming-soon', size: 'sm', centered: true });
  }

  openLoginSignUpModal(selectedTab) {
    const modalRef = this.modalService.open(AuthComponent, {windowClass: 'login-popup', centered: true});
    modalRef.componentInstance.loginFormSelectedTab = selectedTab;
  }
  logOut() {
    this.authSrv.logOut(this.userInfo.userToken).subscribe((res) => {
    if (res.responseCode === '200') {

    }
  }, error => {
    console.log('error', error);
  });
  this.userStorage.clear();
  location.reload(true);
  }
}
