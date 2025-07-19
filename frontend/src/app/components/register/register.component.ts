import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterDto } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Register</h2>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="registerData.username" 
              required 
              class="form-control"
              placeholder="Enter username">
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="registerData.email" 
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
              [(ngModel)]="registerData.password" 
              required 
              minlength="6"
              class="form-control"
              placeholder="Enter password (min 6 characters)">
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              [(ngModel)]="registerData.confirmPassword" 
              required 
              class="form-control"
              placeholder="Confirm your password">
          </div>
          
          <div *ngIf="registerData.password !== registerData.confirmPassword && registerData.confirmPassword" 
               class="password-mismatch">
            Passwords do not match
          </div>
          
          <button type="submit" [disabled]="!registerForm.valid || isLoading || registerData.password !== registerData.confirmPassword" 
                  class="btn btn-primary">
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
        </form>
        
        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>
        
        <div *ngIf="success" class="success-message">
          {{ success }}
        </div>
        
        <div class="login-link">
          Already have an account? <a routerLink="/login">Login here</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterDto = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  isLoading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.success = '';
    
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.success = 'Registration successful! You can now login.';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.error = 'Registration failed. Email may already be in use.';
        this.isLoading = false;
      }
    });
  }
} 