import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/apis/auth.service';
import { LoginResponse } from './models/user';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , AfterViewInit {
  title = 'orastays';
  loading;

  constructor(
    private translateSrv: TranslateService,
    private authSrv: AuthService,
    private router: Router
    ) {
    this.translateSrv.setDefaultLang('en');
    this.loading = true;
  }

  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
  }
    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                    this.loading = false;
                }
            });
    }
  // this.getCountries();
   // this.login();
  useLanguage(language: string) {
    this.translateSrv.use(language);
  }
  getCountries() {
    this.authSrv.getCountries().subscribe((data) => {
      console.log('Countries data', data);
    }, error => {
      console.log('error', error);
    });
  }

  login() {
    const loginRequest = {
      'emailId': 'arvindk427@gmail.com'
    };
    this.authSrv.login(loginRequest).subscribe((responseData: LoginResponse) => {
      console.log('responseData', responseData);
    }, error => {
      console.log('error', error);
    });
  }
}
