import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto, RegisterDto, AuthResponseDto } from '../models/auth.model';
import { UserDto } from '../models/user.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_URL;
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(loginDto: LoginDto): Observable<AuthResponseDto> {
    const loginCommand = {
      loginDto: loginDto
    };
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/user/login`, loginCommand)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(registerDto: RegisterDto): Observable<any> {
    const registerCommand = {
      registerDto: registerDto
    };
    console.log('Sending register request:', registerCommand);
    return this.http.post(`${this.apiUrl}/User/register`, registerCommand)
      .pipe(
        tap(response => {
          console.log('Register response:', response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
    }
  }

  getCurrentUser(): UserDto | null {
    return this.currentUserSubject.value;
  }
} 