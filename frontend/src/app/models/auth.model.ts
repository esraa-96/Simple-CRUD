import { UserDto } from './user.model';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponseDto {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: UserDto;
} 