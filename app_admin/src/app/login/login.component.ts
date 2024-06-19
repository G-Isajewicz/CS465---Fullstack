import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   // Error message to display in the form
  public formError: string = '';

  // Credentials object to bind to the login form
  public credentials = {
  name: '',
  email: '',
  password: ''
};
constructor(
  private router: Router,
  private authenticationService: AuthenticationService
) { }

ngOnInit() {}

// Called when the login form is submitted
public onLoginSubmit(): void {
  this.formError = '';
  if (!this.credentials.email || !this.credentials.password) {
    this.formError = 'All fields are required, please try again';
  } else {
    this.doLogin();
  }
}

// Handle the login process
private doLogin(): void {
  this.authenticationService.login(this.credentials).subscribe({
    next: () => this.router.navigateByUrl(''), // Navigate to home or desired route
    error: (err) => this.formError = err.error.message || 'Login failed'
  });
 }
}