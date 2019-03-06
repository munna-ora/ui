import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxGalleryModule } from 'ngx-gallery';
import { DragScrollModule } from 'ngx-drag-scroll';
import { FormWizardModule } from 'angular2-wizard';
import { TagInputModule } from 'ngx-chips';
import { NguCarouselModule } from '@ngu/carousel';
import { NumberPickerModule } from 'ng-number-picker';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';

import { DesignRoutingModule } from './design-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { HostListingComponent } from './host-listing/host-listing.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { TeamComponent } from './team/team.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { MediaRoomComponent } from './media-room/media-room.component';
import { StickyMenuComponent } from './sticky-menu/sticky-menu.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
import { HostPropertyDetailsComponent } from './host-property-details/host-property-details.component';
import { FlightBookingListComponent } from './flight-booking-oneway/flight-booking-list.component';
import { FlightBookingRoundtripComponent } from './flight-booking-roundtrip/flight-booking-roundtrip.component';
import { PropertyBookingFormComponent } from './property-booking-form/property-booking-form.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UserMyBookingsComponent } from './user-my-bookings/user-my-bookings.component';
import { UserBookingDetailsComponent } from './user-booking-details/user-booking-details.component';
import { UserMySupportComponent } from './user-my-support/user-my-support.component';
import { UserMyCancellationsComponent } from './user-my-cancellations/user-my-cancellations.component';

@NgModule({
  declarations: [
    HomeComponent, 
    PropertyListComponent, 
    HostListingComponent, 
    PropertyDetailsComponent, 
    AboutComponent, 
    CareerComponent, 
    TeamComponent, 
    PrivacyPolicyComponent, 
    CancellationPolicyComponent, 
    MediaRoomComponent, 
    StickyMenuComponent, 
    PropertyDashboardComponent, 
    HostPropertyDetailsComponent, 
    FlightBookingListComponent, 
    FlightBookingRoundtripComponent, 
    PropertyBookingFormComponent, 
    TestimonialComponent, UserMyBookingsComponent, UserBookingDetailsComponent, UserMySupportComponent, UserMyCancellationsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    DesignRoutingModule,
    NgxGalleryModule,
    DragScrollModule,
    DesignRoutingModule,
    SharedModule,
    FormWizardModule,
    TagInputModule,
    NguCarouselModule,
    NumberPickerModule,
    HighchartsChartModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class DesignModule {
  
}
