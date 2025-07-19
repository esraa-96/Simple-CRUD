export interface User {
  id: string;
  userName: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface UserDto {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
} 