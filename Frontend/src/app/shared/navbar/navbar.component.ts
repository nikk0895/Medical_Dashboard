import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Clear session data and redirect to login
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  //  Sidebar navigation methods
 
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
//  goToConfigurator(): void {
//     this.router.navigate(['/configurator']);
//   }

//   goToLogs(): void {
//     this.router.navigate(['/logs']);
//   }
}