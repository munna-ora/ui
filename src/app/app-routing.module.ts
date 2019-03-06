import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';
import { HomeComponent } from './modules/design/home/home.component';
import { PropertyListComponent } from './modules/design/property-list/property-list.component';
import { AboutComponent } from './modules/design/about/about.component';

const routerConfig: Routes = [
  { path: '' , loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'properties' , loadChildren: './modules/property/property.module#PropertyModule' },
  { path: 'flight' , loadChildren: './modules/flight/flight.module#FlightModule' },
  { path: 'host' , loadChildren: './modules/host/host.module#HostModule' },
  { path: 'dashboard' , loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'design' , loadChildren: './modules/design/design.module#DesignModule' },
  { path: 'page-not-found', component: ErrorComponent },
  { path: '**' , redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routerConfig, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
