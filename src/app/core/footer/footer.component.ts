import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WhiteSpaceValidator } from '../../directives/validators/white-space-validation';
import { SharedService} from '../../services/shared.service';
import { SubscriberService } from '../../services/apis/subscriber.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  newsletterForm: FormGroup;
  emailRegx: RegExp;
  newsLetterMessage: string;
  constructor(
    private fb: FormBuilder,
    private sharedSrv: SharedService,
    private subscriberSrv: SubscriberService,
    private modalService: NgbModal
  ) {
     // tslint:disable-next-line:max-line-length
    this.emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.buildNewsletterForm();
   }

  ngOnInit() {
  }

  buildNewsletterForm() {
    this.newsletterForm = this.fb.group({
      name: new FormControl('', [WhiteSpaceValidator.validate]),
      emailId: new FormControl('', [Validators.required, Validators.pattern(this.emailRegx)]),
    });
  }
  onSubmitNewsLetterFrom() {
    if (this.newsletterForm.valid) {
      console.log(this.newsletterForm.value);
      const requestData = this.newsletterForm.value;
      this.subscriberSrv.addSubscriber(requestData).subscribe((responseData) => {
        console.log(responseData);
        this.newsLetterMessage = responseData.responseBody;
        this.newsletterForm.reset();
      }, errorData => {
        console.log('error', errorData);
        if (errorData && errorData.status === 400) {
          this.newsLetterMessage = errorData.error.responseMessage;
        }
        this.newsletterForm.reset();
      });

    } else {
      this.sharedSrv.validateAllFormFields(this.newsletterForm);
    }

  }

  openTermsConditions(content){
    this.modalService.open(content, { windowClass: 'modal-popup', size: 'lg', centered: true });
  }

}
