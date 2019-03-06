import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PropertyComponent } from './property/property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingCancellationComponent } from './booking-cancellation/booking-cancellation.component';
import { SupportComponent } from './support/support.component';

const routerConfig: Routes = [
  { path: '', component: DashboardComponent,
   children: [
    { path: '', component: PropertyComponent},
    { path: 'property', component: PropertyComponent},
    { path: 'property-details/:id', component: PropertyDetailsComponent, pathMatch: 'full'},
    { path: 'bookings', component: BookingListComponent},
    { path: 'booking-details', component: BookingDetailsComponent},
    { path: 'booking-cancellation', component: BookingCancellationComponent},
    { path: 'support', component: SupportComponent},
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routerConfig)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
