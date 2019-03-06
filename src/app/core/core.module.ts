import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { OtpFormComponent } from './auth/forms/otp-form/otp-form.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ErrorComponent, AuthComponent, OtpFormComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [HeaderComponent, FooterComponent, ErrorComponent],
  entryComponents: [AuthComponent]
})
export class CoreModule { }
