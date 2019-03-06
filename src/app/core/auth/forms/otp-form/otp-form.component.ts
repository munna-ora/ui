import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WhiteSpaceValidator } from '../../../../directives/validators/white-space-validation';
import { SharedService} from '../../../../services/shared.service';
import { AuthService } from '../../../../services/apis/auth.service';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent implements OnInit {

  @Input() otpFor: string;
  @Input() formData: object;
  @Input() userData: any;
  @Output() otpValidateSuccess  = new EventEmitter<any>();
  @Output() loginSignUpLinkClick  = new EventEmitter<string>();
  otpForm: FormGroup;
  errorMessage: string;
  otpResentMessage: string;
  constructor(
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    private authSrv: AuthService
  ) {
      this.buildOtpForm();
  }

  ngOnInit() {
    console.log(this.otpFor);
    console.log(this.userData);
  }

  /**
   * This method is responsible for building, setup input filed and validator of Login form
   */
  buildOtpForm() {
    this.otpForm = this.fb.group({
      otp: new FormControl('', [WhiteSpaceValidator.validate])
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const otp =  this.otpForm.value.otp;
      const registerRequest =   {
        otp: otp,
        userId: this.userData.userId,
        deviceId : 'abc'
      };
      if (this.otpFor === 'register') {
        this.validateSignUpOtp(registerRequest);
      } else {
        this.validateLoginOtp(registerRequest);
      }
    } else {
      this.sharedSrv.validateAllFormFields(this.otpForm);
    }
  }

  validateLoginOtp (registerRequest) {
    this.authSrv.validateLoginOtp(registerRequest).subscribe((responseData) => {
      console.log('responseData', responseData);
      this.otpValidateSuccess.emit(responseData.responseBody);
    }, errorData => {

      if (errorData && errorData.status === 400) {
        this.errorMessage = errorData.error.responseMessage;
        this.otpForm.controls['otp'].setErrors({'invalid': true});
      }
    });
  }
  validateSignUpOtp (registerRequest) {
    this.authSrv.validateSignUpOtp(registerRequest).subscribe((responseData) => {
      console.log('responseData', responseData);
      this.otpValidateSuccess.emit(responseData.responseBody);
    }, errorData => {

      if (errorData && errorData.status === 400) {
        this.errorMessage = errorData.error.responseMessage;
        this.otpForm.controls['otp'].setErrors({'invalid': true});
      }
    });
  }
  resendOtp() {
    const request = {
      userId : this.userData.userId
    };
    this.authSrv.resendOtp(request).subscribe((responseData) => {
      console.log('responseData', responseData);
      this.otpResentMessage = responseData.responseMessage;

    }, errorData => {
      console.log(errorData);
      if (errorData && errorData.status === 400) {
        this.otpResentMessage = errorData.error.responseMessage;
      }
    });
  }
  showLoginSignUpForm(tabName: string) {
    this.loginSignUpLinkClick.emit(tabName);
  }

}
