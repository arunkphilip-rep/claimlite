# 📋 ClaimLite - Full-Stack Insurance Claims Management Platform

ClaimLite is a production-ready, full-stack insurance claim processing platform engineered with an **Angular (Nx Monorepo)** frontend and a **Node.js / Express / MongoDB** RESTful backend API. 

This document provides a broad, detailed technical reference explaining the system architecture, application data flows, and an exhaustive breakdown of every core frontend component and service.

---

## 🏗️ End-to-End System Flow Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   FRONTEND (Angular / Nx)                              │
│                                                                                        │
│  ┌──────────────────────┐    Data Binding & Form Inputs    ┌────────────────────────┐  │
│  │       app.html       │ ───────────────────────────> │         app.ts         │  │
│  │  (Template & UI)     │ <─────────────────────────── │  (Component Controller)│  │
│  └──────────────────────┘        Reactive State        └───────────┬────────────┘  │
│                                                                    │               │
│                                                        Invokes API │               │
│                                                        Methods     │               │
│                                                                    ▼               │
│                                                        ┌────────────────────────┐  │
│                                                        │    claim.service.ts    │  │
│                                                        │   (HttpClient Service) │  │
│                                                        └───────────┬────────────┘  │
└────────────────────────────────────────────────────────────────────┼───────────────┘
                                                                     │ HTTP REST API
                                                                     │ (JSON Payload)
┌────────────────────────────────────────────────────────────────────┼───────────────┐
│                                   BACKEND (Express / Node.js)      │               │
│                                                                    ▼               │
│                                                        ┌────────────────────────┐  │
│                                                        │       server.js        │  │
│                                                        │  (Express Server Entry)│  │
│                                                        └───────────┬────────────┘  │
│                                                                    │               │
│                                                           Route    │               │
│                                                           Dispatch │               │
│                                                                    ▼               │
│                                                        ┌────────────────────────┐  │
│                                                        │ /routes/userRoutes.js  │  │
│                                                        │ /routes/claimRoutes.js │  │
│                                                        └───────────┬────────────┘  │
│                                                                    │               │
│                                                           Database │               │
│                                                           Queries  │               │
│                                                                    ▼               │
│                                                        ┌────────────────────────┐  │
│                                                        │   MongoDB Database     │  │
│                                                        │   (User & Claim Model) │  │
│                                                        └────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Frontend Deep-Dive: File Roles & Execution Logic

All primary frontend code resides within `frontend/claimlite/src/app/`. Below is a comprehensive breakdown of how each file functions.

---

### 1. `app.config.ts` (Application Configuration & Providers)
📍 **File Location:** `frontend/claimlite/src/app/app.config.ts`

#### **Role & Purpose**
Acts as the central dependency injection configuration for the standalone Angular application. It provisions globally accessible services and infrastructure modules without relying on legacy `NgModule` declarations.

#### **Key Code Responsibilities**
- **`provideHttpClient()`**: Enables Angular’s `HttpClient` globally. Without this provider, services like `ClaimService` cannot send HTTP requests to the backend server.
- **`provideRouter(appRoutes)`**: Initializes the Angular router with client-side navigation definitions.
- **`provideBrowserGlobalErrorListeners()`**: Registers global exception handlers for uncaught runtime errors.

---

### 2. `claim.service.ts` (Data Access & API Service Layer)
📍 **File Location:** `frontend/claimlite/src/app/claim.service.ts`

#### **Role & Purpose**
Acts as the single source of truth for backend communication. It decouples network HTTP operations from presentation components, ensuring clean separation of concerns.

#### **Core Data Interfaces**
```typescript
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
```

#### **API Methods Breakdown**
- **`getUsers(): Observable<User[]>`**: Sends a `GET` request to `http://localhost:3000/api/users` to fetch all registered clients sorted by creation timestamp.
- **`createUser(payload): Observable<User>`**: Sends a `POST` request to `/api/users` containing client credentials (`fullName`, `email`, `phone`).
- **`getClaims(): Observable<Claim[]>`**: Sends a `GET` request to `/api/claims` to retrieve all claims with populated user details.
- **`createClaim(payload): Observable<Claim>`**: Sends a `POST` request to `/api/claims` associating a claim with a specific client ID.

---

### 3. `app.ts` (Component Controller & Reactive Logic)
📍 **File Location:** `frontend/claimlite/src/app/app.ts`

#### **Role & Purpose**
The main component controller (`App`). It manages component lifecycle, reactive form state, user interaction handlers, calculation helper functions, and error/success messaging.

#### **Key Responsibilities & Flow**
1. **State Initialization (`ngOnInit`)**:
   Calls `loadUsers()` and `loadClaims()` immediately when the application loads to populate local arrays from the database.

2. **Form Management with `FormBuilder`**:
   - **`userForm`**: Validates client full name (min length 2), email format, and 10-digit telephone pattern (`^\d{10}$`).
   - **`claimForm`**: Validates client selection, claim category (`Auto`, `Home`, `Health`), monetary amount (minimum `$0.01`), and incident description (10 to 500 characters).

3. **Data Operations & Submission**:
   - **`submitUser()`**: Invokes `claimService.createUser()`. On success, displays a confirmation banner, clears form fields, and reloads the client dropdown automatically.
   - **`submitClaim()`**: Invokes `claimService.createClaim()`. On success, updates the live portfolio total and appends the new claim to the list feed.

4. **Aggregate Calculation Helpers**:
   - **`totalClaimValue()`**: Computes aggregate portfolio dollar value using `claims.reduce()`.
   - **`getUserName(userId)`**: Safely resolves whether `userId` is a populated `User` object or an ID string to display customer names cleanly.
   - **`formatCurrency(value)`**: Formats numbers into standard USD currency format (`Intl.NumberFormat`).

---

### 4. `app.html` (Template & Semantic Layout)
📍 **File Location:** `frontend/claimlite/src/app/app.html`

#### **Role & Purpose**
Renders the visual interface using clean, semantic HTML5 tags and Angular structural directives.

#### **Section-by-Section Overview**
1. **Header & Status Banner**: Displays the application title and live database status indicator.
2. **Metric Summary Grid (`.stats`)**: Shows 3 dynamic card widgets:
   - **Total Users**: `{{ users.length }}`
   - **Total Claims**: `{{ claims.length }}`
   - **Total Portfolio Value**: `{{ formatCurrency(totalClaimValue()) }}`
3. **Alert Banner Row (`.msg-error`, `.msg-success`)**: Conditionally renders contextual status alerts using `*ngIf`.
4. **Interactive Form Grid (`.grid`)**:
   - Left Card: **Add User Form** bound to `[formGroup]="userForm"` with `(ngSubmit)="submitUser()"`.
   - Right Card: **Submit Claim Form** bound to `[formGroup]="claimForm"`. Features a dynamic `<select>` dropdown populated via `*ngFor="let u of users"`.
5. **Recent Claims Feed (`.claim-list`)**: Lists all registered claims using `*ngFor="let c of claims"`, rendering category badges, client names, descriptions, and amounts.

---

### 5. `app.css` (High-Performance Styling System)
📍 **File Location:** `frontend/claimlite/src/app/app.css`

#### **Role & Purpose**
Delivers a lightweight UI optimized for smooth frame rates across standard (60Hz) and gaming/high-refresh-rate displays (90Hz, 120Hz, 144Hz).

#### **Performance Optimizations**
- **GPU Hardware Acceleration**: Utilizes 3D transform layers (`transform: translate3d(0, 0, 0)`) and browser rendering hints (`will-change: transform`) to prevent layout thrashing and main-thread execution lag during form interactions.
- **Zero Glassmorphism Overhead**: Avoids expensive CPU/GPU background blur operations (`backdrop-filter`) for maximum speed and instant rendering.
- **Responsive Breakpoints**: Flexbox and CSS Grid breakpoints (`@media (max-width: 640px)`) ensure seamless adaptivity from mobile viewports to desktop monitors.

---

## 🔄 Detailed Data Flow Examples

### **Flow A: Registering a New Client**
1. User enters client details into the **Add User** form in `app.html`.
2. `userForm` validates input fields in real time.
3. User clicks **Save User**, triggering `(ngSubmit)="submitUser()"` in `app.ts`.
4. `app.ts` passes the payload to `ClaimService.createUser()`.
5. `ClaimService` executes an HTTP `POST` to `/api/users`.
6. Express route `userRoutes.js` validates data and saves the user to **MongoDB**.
7. Response status `201 Created` returns to `ClaimService`.
8. `app.ts` receives the created `User` object, updates `users` array, resets the form, and updates the **Select User** dropdown in the claim form instantly.

### **Flow B: Filing an Insurance Claim**
1. User chooses a client from the dropdown, selects a category (`Auto`/`Home`/`Health`), enters an amount, and writes a description.
2. User clicks **Submit Claim**, triggering `submitClaim()` in `app.ts`.
3. `ClaimService.createClaim()` posts payload to `/api/claims`.
4. Express route `claimRoutes.js` writes the record to MongoDB.
5. Frontend receives confirmation, triggers `loadClaims()`, and updates the **Total Amount** stat box and **Recent Claims** list feed seamlessly.

---

## 🚀 Execution Commands

### **Backend Server** (Root Directory)
```bash
npm run dev
```
*Runs Express server on `http://localhost:3000` with hot-reloading via Nodemon.*

### **Frontend Application** (`frontend` Directory)
```bash
npx nx serve claimlite
```
*Compiles and serves the Angular frontend on `http://localhost:4200` using Vite.*
