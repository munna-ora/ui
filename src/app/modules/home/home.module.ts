import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AboutComponent } from './about/about.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { CareerComponent } from './career/career.component';
import { MediaRoomComponent } from './media-room/media-room.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TeamComponent } from './team/team.component';
import { StickyMenuComponent } from './sticky-menu/sticky-menu.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    HomeComponent,
    TestimonialComponent,
    AboutComponent,
    CancellationPolicyComponent,
    CareerComponent,
    MediaRoomComponent,
    PrivacyPolicyComponent,
    TeamComponent,
    StickyMenuComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    ShareButtonsModule,
    MatTabsModule,
    MatStepperModule
  ]
})
export class HomeModule { }
