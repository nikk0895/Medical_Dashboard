import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //  Shared fields
  email = '';
  password = '';
  errorMessage = '';

  //  Signup fields
  firstName = '';
  lastName = '';

  //  Toggle between login/signup
  isLoginMode = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  //  Switch mode
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  //  Login method
  login(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  // Signup method
  signup(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.authService.signup(this.firstName, this.lastName, this.email, this.password).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.toggleMode(); // Switch to login mode
      },
      error: () => {
        this.errorMessage = 'Signup failed. Try again.';
      }
    });
  }
}