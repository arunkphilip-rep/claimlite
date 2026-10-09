import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt?: string;
}

export interface Claim {
  _id?: string;
  userId?: string | User;
  claimType: 'Auto' | 'Home' | 'Health';
  amount: number;
  description: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ClaimService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api';

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getClaims() {
    return this.http.get<Claim[]>(`${this.baseUrl}/claims`);
  }

  createUser(payload: Omit<User, '_id' | 'createdAt'>) {
    return this.http.post<User>(`${this.baseUrl}/users`, payload);
  }

  createClaim(payload: {
    userId: string;
    claimType: Claim['claimType'];
    amount: number;
    description: string;
  }) {
    return this.http.post<Claim>(`${this.baseUrl}/claims`, payload);
  }
}
