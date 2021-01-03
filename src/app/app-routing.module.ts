import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // loadChildren is the keyword for lazy loading
  {
    path: 'training',
    loadChildren: () =>
      import('./training/exercise.module').then(
        (moduleLoaded) => moduleLoaded.ExerciseModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // usually providers are added in app.module.ts but here it is made available where it is used (in this module)
  providers: [AuthGuard],
})
export class AppRoutingModule {}
