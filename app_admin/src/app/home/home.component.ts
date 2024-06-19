import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public logout(): void {
    this.authenticationService.logout();
    
  }
}
