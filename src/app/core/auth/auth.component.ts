import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WhiteSpaceValidator } from '../../directives/validators/white-space-validation';
import { SharedService} from '../../services/shared.service';
import { AuthService } from '../../services/apis/auth.service';
import { UserStorageProvider } from '../../services/storage/user-storage.service';
import { ValidateEmailNotTaken } from '../../directives/validators/email-not-taken-validation';
import { ValidateMobileNotTaken } from '../../directives/validators/mobile-not-taken-validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  currentJustify = 'justified';
  loginFormSelectedTab: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  emailRegx: RegExp;
  mobileRegx: RegExp;
  loading: boolean;
  loginType: string;
  countryList: Array<any>;
  errorMessage: string;
  displayLoginOtpForm: boolean;
  displayRegisterOtpForm: boolean;
  loginUserData: object;
  registerUserData: object;
  privacyPolicyData: object;
  formData: object;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    private authSrv: AuthService,
    private userStorage: UserStorageProvider,
    private modalService: NgbModal
  ) {
    /** set default value of properties */
    this.loading = false;
    this.loginType = 'email';
    this.displayLoginOtpForm = false;
    this.displayRegisterOtpForm = false;
   // tslint:disable-next-line:max-line-length
    this.emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // this.mobileRegx = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    this.mobileRegx = /^\d{10}$/;
    /** invoke Building Login form */
    this.buildLoginForm();
    this.buildRegisterForm();
    this.getCountries();
  }
  ngOnInit() {
    console.log(this.loginFormSelectedTab);
  }

  /**
   * This method is responsible for building, setup input filed and validator of Login form
   */
  buildLoginForm() {
    this.loginForm = this.fb.group({
      emailMobile: new FormControl('', [WhiteSpaceValidator.validate, this.validateEmailMobile.bind(this)]),
      countryCode: new FormControl('', [])

    });
  }
  /**
   * This method is responsible validate email or mobile number.
   */
  validateEmailMobile (control: FormControl) {
    if (control.value !== '' && control.value !== null) {
      if (this.mobileRegx.test(control.value)) {
        this.setLoginType('mobile');
        return null;
      } else if (this.emailRegx.test(control.value)) {
        this.setLoginType('email');
        return null;
      } else {
        return { pattern: true};
      }

    }
    return null;
  }

  setLoginType(type: string) {
    this.loginType = type;
    if (this.loginType === 'mobile') {
      this.loginForm.controls['countryCode'].setValidators([Validators.required]);
    } else {
      this.loginForm.controls['countryCode'].setValidators(null);
    }
    this.loginForm.controls['countryCode'].updateValueAndValidity();
  }

  getCountries() {
    this.authSrv.getCountries().subscribe((res) => {
      console.log('Countries data', res);
      if (res.responseCode === '200') {
        this.countryList = res.responseBody;
      }
    }, error => {
      console.log('error', error);
    });
  }
    /**
   * This method is responsible for building, setup input filed and validator of Register form
   */
  buildRegisterForm() {
    /* tslint:disable */
    /* tslint:enable */
    this.registerForm = this.fb.group({
      name: new FormControl('', [WhiteSpaceValidator.validate]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegx)], [ValidateEmailNotTaken(this.authSrv)]),
      countryCode : new FormControl('', [Validators.required]),
        // tslint:disable-next-line:max-line-length
      mobile: new FormControl('', [Validators.required, Validators.pattern(this.mobileRegx)], [ValidateMobileNotTaken(this.authSrv, 'countryCode')]),
      cb: [false, [Validators.required, Validators.requiredTrue]]
     });
  }

  tabChange(evt: any) {
    const currentTabName = evt.nextId;
    if (currentTabName === 'signupTab') {
      this.registerForm.reset();
      this.registerForm.patchValue({'countryCode': ''});
    } else {
      this.loginForm.reset();
      this.loginForm.patchValue({'countryCode': ''});
    }
    this.loginFormSelectedTab = currentTabName;
    this.loginType = 'email';
    this.errorMessage = '';
  }
  /**
	 * This method will get invoked after submit of the Login Form.
	 */
  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm.value);
      const loginFormData =  this.loginForm.value;
      let loginRequest = {};
      if (this.loginType === 'mobile') {
        loginRequest = {
          mobileNumber : loginFormData.emailMobile,
          country : {
            countryId : loginFormData.countryCode,
          }
        };
        this.formData = { otpSendTo : loginFormData.emailMobile };
      } else {
        loginRequest = {
          emailId : loginFormData.emailMobile
        };
      }
      this.formData = {emailMobile: loginFormData.emailMobile };
      this.authSrv.login(loginRequest).subscribe((responseData) => {
        console.log('responseData', responseData);
        this.displayLoginOtpForm = true;
        this.loading = false;
        this.loginUserData = responseData.responseBody;
      }, errorData => {
        console.log('error', errorData);
        this.loading = false;
        if (errorData && errorData.status === 400) {
          this.errorMessage = errorData.error.responseMessage;
        }
      });

    } else {
      this.sharedSrv.validateAllFormFields(this.loginForm);
    }
  }

  /**
	 * This method will get invoked after submit of the Register Form.
	 */
  onSubmitRegister() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const registerFormData =  this.registerForm.value;
      const registerRequest =   {
        name: registerFormData.name,
        country: {
          countryId: registerFormData.countryCode,
        },
        mobileNumber: registerFormData.mobile,
        emailId : registerFormData.email,
        privacyPolicy: 'Y'
      };
      this.formData = registerRequest;
      this.authSrv.signUp(registerRequest).subscribe((responseData) => {
        console.log('responseData', responseData);
        this.displayRegisterOtpForm = true;
        this.loading = false;
        this.registerUserData = responseData.responseBody;
      }, errorData => {
        console.log('error', errorData);
        this.loading = false;
        if (errorData && errorData.status === 400) {
          this.errorMessage = errorData.error.responseMessage;
        }
      });
    } else {
      this.sharedSrv.validateAllFormFields(this.registerForm);
    }
  }
  closeModal() {
    this.activeModal.close();
  }
  otpValidateSuccess(data) {
    if (data) {
      console.log(data);
      this.userStorage.set(data);
     // this.closeModal();
      location.reload(true);
    }
  }
  loginSignUpLinkClick(tabName: string) {
    if (tabName) {
     // console.log(tabName);
      this.loginFormSelectedTab = tabName;
    }
  }
  onCountryChange() {
    this.registerForm.controls['mobile'].updateValueAndValidity();
  }
  openPrivacyPolicyModal(content) {
    this.authSrv.getPrivacyPolicy().subscribe((res) => {
      this.privacyPolicyData = res.responseBody;
      this.modalService.open(content, { windowClass: 'modal-popup', size: 'lg', centered: true });
    }, errorData => {
      console.log('error', errorData);
    });
  }
}
