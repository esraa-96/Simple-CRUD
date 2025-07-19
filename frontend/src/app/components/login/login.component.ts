import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="loginData.email" 
              required 
              class="form-control"
              placeholder="Enter your email">
          </div>
          
          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="loginData.password" 
              required 
              class="form-control"
              placeholder="Enter your password">
          </div>
          
          <button type="submit" [disabled]="!loginForm.valid || isLoading" class="btn btn-primary">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>
        
        <div class="register-link">
          Don't have an account? <a routerLink="/register">Register here</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginDto = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginData.email && this.loginData.password) {
      this.isLoading = true;
      this.error = '';
      
      this.authService.login(this.loginData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.error = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      });
    }
  }
} 