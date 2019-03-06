import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyBookingComponent } from './property-booking/property-booking.component';
import { PropertyBookingConfirmationComponent } from './property-booking-confirmation/property-booking-confirmation.component';

const routerConfig: Routes = [
 // { path: '', redirectTo: 'properties', pathMatch: 'full'},
  { path: '', component: PropertyComponent},
  { path: 'property-details', component: PropertyDetailsComponent},
  { path: 'booking', component: PropertyBookingComponent},
  { path: 'booking/confirmation', component: PropertyBookingConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routerConfig)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
