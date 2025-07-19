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
  templateUrl: './login.component.html',
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