import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host.component';

const routerConfig: Routes = [
  { path: '', component: HostComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routerConfig)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
