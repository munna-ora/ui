import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';

@NgModule({
  declarations: [HostComponent],
  imports: [
    SharedModule,
    HostRoutingModule
  ]
})
export class HostModule { }
