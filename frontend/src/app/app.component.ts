import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-container">
      <nav class="navbar" *ngIf="isAuthenticated">
        <div class="nav-brand">
          <a routerLink="/books">Book Management System</a>
        </div>
        <div class="nav-menu">
          <a routerLink="/books" class="nav-link">Books</a>
          <button (click)="logout()" class="nav-link logout-btn">Logout</button>
        </div>
      </nav>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .navbar {
      background: #333;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-brand a {
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .nav-menu {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .logout-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .main-content {
      min-height: calc(100vh - 70px);
    }
  `]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
