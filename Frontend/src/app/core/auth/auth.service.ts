import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Backend base URL

  constructor(private http: HttpClient) {}

  // ✅ Real Login using backend
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Save token to localStorage
        localStorage.setItem('token', response.token);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.message || 'Login failed'));
      })
    );
  }

  // ✅ Real Signup using backend
  signup(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, {
      firstName,
      lastName,
      email,
      password,
    }).pipe(
      tap((response: any) => console.log('Signup successful:', response)),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(() => new Error(error.error?.message || 'Signup failed'));
      })
    );
  }

  // ✅ Logout (same)
  logout() {
    localStorage.removeItem('token');
  }

  // ✅ Helper: check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}