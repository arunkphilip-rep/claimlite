# 📋 ClaimLite - Insurance Claims Management System

ClaimLite is a full-stack insurance claim processing platform built with an **Angular (Nx)** frontend and a **Node.js / Express / MongoDB** backend. It enables seamless client registration, policy claim submissions, total portfolio analytics, and real-time claim status tracking.

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** Angular (Nx Monorepo Workspace)
- **Build Tool:** Vite
- **State Management & Reactive Logic:** RxJS & Angular Reactive Forms
- **Styling:** Clean Vanilla CSS with GPU Hardware Acceleration (60Hz - 144Hz High Refresh Rate Support)

### **Backend**
- **Runtime & Server:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Middlewares:** CORS, Dotenv, Body Parser

---

## ✨ Features

- 👤 **Client Management:** Create and store client profiles with email & 10-digit phone validation.
- 📋 **Claim Processing:** Submit policy claims for Auto, Home, and Health categories.
- 📊 **Real-Time Analytics:** Live stat widgets tracking Total Users, Total Claims, and Total Portfolio Dollar Value.
- ⚡ **High Refresh Rate UI (120Hz / 144Hz):** Optimized CSS transformations (`transform: translate3d(0,0,0)` & `will-change`) for zero frame drops.
- 🛡️ **RESTful API:** Structured Express endpoints with Mongoose schema validation & duplicate prevention.

---

## 📁 Repository Architecture

```text
claimlite/
├── config/             # Database connection configuration (MongoDB)
│   └── db.js
├── models/             # Mongoose Schemas (User & Claim)
│   ├── User.js
│   └── Claim.js
├── routes/             # Express API Routes
│   ├── userRoutes.js   # /api/users
│   └── claimRoutes.js  # /api/claims
├── frontend/           # Angular Nx Monorepo Workspace
│   └── claimlite/      # Main Angular ClaimLite Application
│       └── src/app/
│           ├── app.ts            # Component Logic & Reactive Forms
│           ├── app.html          # Clean Semantic HTML Layout
│           ├── app.css           # High-Performance UI Styling
│           ├── claim.service.ts  # HTTP Client Service
│           └── app.config.ts     # Angular Provider Configuration
├── .env                # Environment Variables (MONGO_URI, PORT)
├── server.js           # Express Server Entrypoint
└── package.json        # Backend Dependencies & Scripts
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/claimlite
```

---

## 🏁 Getting Started

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start Backend Server
Run the Express backend on `http://localhost:3000`:
```bash
npm run dev
```

### 3. Start Frontend Application
Run the Angular Vite dev server:
```bash
npx nx serve claimlite
```
Access the UI at `http://localhost:4200` (or displayed Vite port).

---

## 📡 API Reference

### **User Endpoints (`/api/users`)**
| Method | Endpoint | Description | Payload Sample |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Fetch all registered clients | N/A |
| `POST` | `/api/users` | Register a new client | `{ "fullName": "Jane Doe", "email": "jane@example.com", "phone": "9876543210" }` |

### **Claim Endpoints (`/api/claims`)**
| Method | Endpoint | Description | Payload Sample |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/claims` | Fetch all claims with populated user info | N/A |
| `POST` | `/api/claims` | Submit a new policy claim | `{ "userId": "<USER_ID>", "claimType": "Auto", "amount": 1500, "description": "Windshield damage" }` |

---

## 🏎️ Performance & Refresh Rate Optimization

- **GPU Offloading:** Interactive components utilize 3D matrix transforms (`translate3d(0, 0, 0)`) to force GPU layer creation.
- **Main Thread Idle:** Micro-animations run independently of main-thread JavaScript execution for fluid rendering on 60Hz, 90Hz, 120Hz, and 144Hz monitors.
