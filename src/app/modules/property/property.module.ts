import { NgModule } from '@angular/core';
import { PropertyRoutingModule } from './property-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PropertyComponent } from './property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyBookingComponent } from './property-booking/property-booking.component';
import { PropertyBookingConfirmationComponent } from './property-booking-confirmation/property-booking-confirmation.component';

@NgModule({
  declarations: [
    PropertyComponent, 
    PropertyDetailsComponent, 
    PropertyBookingComponent, 
    PropertyBookingConfirmationComponent
  ],
  imports: [
    PropertyRoutingModule,
    SharedModule
  ]
})
export class PropertyModule { }
