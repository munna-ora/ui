import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './flight.component';
import { OnewayComponent } from './oneway/oneway.component';
import { RoundtripComponent } from './roundtrip/roundtrip.component';
import { MulticityComponent } from './multicity/multicity.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

const routerConfig: Routes = [
  { path: '', component: FlightComponent,
   children: [
    { path: '', component: OnewayComponent},
     { path: 'oneway', component: OnewayComponent},
     { path: 'roundtrip', component: RoundtripComponent},
     { path: 'multicity', component: MulticityComponent},
    { path: 'flight-booking', component: FlightBookingComponent}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routerConfig)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
