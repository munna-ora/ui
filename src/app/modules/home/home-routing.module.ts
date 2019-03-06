import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AboutComponent } from './about/about.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { CareerComponent } from './career/career.component';
import { MediaRoomComponent } from './media-room/media-room.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TeamComponent } from './team/team.component';


const routerConfig: Routes = [
  { path: '', component: HomeComponent},
  { path: 'testimonial', component: TestimonialComponent},
  { path: 'about', component: AboutComponent},
  { path: 'career', component: CareerComponent},
  { path: 'team', component: TeamComponent},
  { path: 'media', component: MediaRoomComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'cancellation-policy', component: CancellationPolicyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routerConfig)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
