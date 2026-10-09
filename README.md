# ClaimLite

ClaimLite is a full-stack insurance claims management application built with Angular and Nx on the frontend, and Node.js, Express, and MongoDB on the backend.

## ✅ Current Implementation Status
- Angular frontend
- Nx workspace
- Duet Design System
- Global navigation
- Landing page
- Policyholder registration
- Policyholder validation
- Duplicate email handling
- Policyholder list
- Claim registration
- Claim validation
- Dynamic policyholder selection
- Zero-policyholder protection
- Claims list
- Populated policyholder names
- Currency formatting
- Date formatting
- API error handling
- Loading/submission states
- MongoDB integration
- REST APIs
- Production frontend build

## 📌 Important Notes
The backend must be running before using the frontend because the frontend retrieves and submits data through the REST API.

For local development:

Frontend → http://localhost:4200
           ↓
Backend  → http://localhost:3000
           ↓
MongoDB  → claimlite

## 🛠️ Tech Stack
- Frontend: Angular, Nx, Duet Design System
- Backend: Node.js, Express
- Database: MongoDB
- API: REST endpoints for users and claims

## 📁 Project Structure
```text
claimlite/
├── frontend/
│   └── claimlite/
│       ├── src/
│       ├── project.json
│       └── package.json
├── models/
├── routes/
├── config/
├── server.js
├── package.json
├── .env
├── README.md
└── ...
```

## ▶️ Run the Project

### 1) Start MongoDB
Make sure MongoDB is running locally and the database named `claimlite` is available.

### 2) Start the backend
From the project root:

```bash
npm install
npm run dev
```

The API should run at:

```text
http://localhost:3000
```

### 3) Start the frontend
From the frontend workspace folder:

```bash
cd frontend
npm install
npx nx serve claimlite
```

Then open:

```text
http://localhost:4200
```

## 🧩 Core Features
- Register policyholders
- Validate required form fields
- Prevent duplicate email registrations
- Add insurance claims with policyholder association
- List claims with user names and formatted values
- Handle API failures and loading states
- Populate user selections dynamically based on saved records

## 🔗 API Overview
The application exposes REST endpoints for:
- User creation and retrieval
- Claim creation and retrieval

These endpoints are consumed by the Angular frontend through the API layer.
