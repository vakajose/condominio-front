import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Usuario} from '../models/auth/usuario.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthResponse} from '../models/auth/auth.response';
import {AuthRequest} from '../models/auth/auth.request';
import { tap } from 'rxjs/operators';
import {StorageService} from '../service/storage.service';
import {Constants} from '../constants/constants';
import {RegisterRequest} from '../models/auth/register.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.restApiUrl}${environment.restApiVersion}/auth`;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private storageService:StorageService) { }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.storeToken(response.access_token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap(response => {
        this.storeToken(response.access_token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    this.storageService.setItem(Constants.SESSION_TOKEN, token);
  }

  getToken(): string | null {
    return this.storageService.getItem(Constants.SESSION_TOKEN);
  }

  private clearToken(): void {
    this.storageService.removeItem(Constants.SESSION_TOKEN);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `${Constants.BEARER_PREFIX}${token}` }) : new HttpHeaders();
  }

}
