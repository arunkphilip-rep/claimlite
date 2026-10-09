import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Claim, ClaimService, User } from './claim.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly claimService = inject(ClaimService);

  users: User[] = [];
  claims: Claim[] = [];
  errorMessage = '';
  infoMessage = '';

  userForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  claimForm = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    claimType: 'Auto' as Claim['claimType'],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
    ],
  });

  ngOnInit(): void {
    this.loadUsers();
    this.loadClaims();
  }

  loadUsers(): void {
    this.claimService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        if (users.length > 0 && !this.claimForm.controls.userId.value) {
          this.claimForm.controls.userId.setValue(users[0]._id ?? '');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message ?? 'Unable to load users.';
      },
    });
  }

  loadClaims(): void {
    this.claimService.getClaims().subscribe({
      next: (claims) => {
        this.claims = claims;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message ?? 'Unable to load claims.';
      },
    });
  }

  submitUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.claimService.createUser(this.userForm.getRawValue()).subscribe({
      next: (user) => {
        this.infoMessage = `User ${user.fullName} created successfully.`;
        this.userForm.reset();
        this.loadUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message ?? 'Unable to create user.';
      },
    });
  }

  submitClaim(): void {
    if (this.claimForm.invalid) {
      this.claimForm.markAllAsTouched();
      return;
    }

    const payload = this.claimForm.getRawValue();

    this.claimService.createClaim(payload).subscribe({
      next: () => {
        this.infoMessage = 'Claim submitted successfully.';
        this.claimForm.reset({
          userId: this.users[0]?._id ?? '',
          claimType: 'Auto',
          amount: 0,
          description: '',
        });
        this.loadClaims();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message ?? 'Unable to submit claim.';
      },
    });
  }

  totalClaimValue(): number {
    return this.claims.reduce((sum, claim) => sum + Number(claim.amount || 0), 0);
  }

  getUserName(userId: string | User | undefined): string {
    if (typeof userId === 'object' && userId !== null) {
      return userId.fullName;
    }
    const user = this.users.find((u) => u._id === userId);
    return user ? user.fullName : 'Customer';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}

