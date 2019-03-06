import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight.component';
import { OnewayComponent } from './oneway/oneway.component';
import { RoundtripComponent } from './roundtrip/roundtrip.component';
import { MulticityComponent } from './multicity/multicity.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

@NgModule({
  declarations: [
    FlightComponent,
    OnewayComponent, 
    RoundtripComponent, 
    MulticityComponent, 
    FlightBookingComponent
  ],
  imports: [
    FlightRoutingModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class FlightModule { }
