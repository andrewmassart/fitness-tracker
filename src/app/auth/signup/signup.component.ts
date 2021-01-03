import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  // inject AuthService to utilize it
  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    (this.maxDate = new Date()),
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
