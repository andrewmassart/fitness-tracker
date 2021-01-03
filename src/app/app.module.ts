import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UIService } from './shared/ui.service';
import { ExerciseModule } from './training/exercise.module';
import { ExerciseService } from './training/exercise.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    ExerciseModule,
    AuthModule,
  ],
  // provider ensures that we only use one instance of AuthService
  providers: [AuthService, ExerciseService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
