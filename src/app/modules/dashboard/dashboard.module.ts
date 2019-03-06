import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { PropertyComponent } from './property/property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingCancellationComponent } from './booking-cancellation/booking-cancellation.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavBarComponent,
    PropertyComponent,
    PropertyDetailsComponent,
    BookingListComponent,
    BookingDetailsComponent,
    BookingCancellationComponent,
    SupportComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
