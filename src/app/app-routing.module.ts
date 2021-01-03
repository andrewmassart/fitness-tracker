import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // usually providers are added in app.module.ts but here it is made available where it is used (in this module)
  providers: [AuthGuard],
})
export class AppRoutingModule {}
