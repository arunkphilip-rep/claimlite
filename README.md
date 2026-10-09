# ClaimLite

ClaimLite is an insurance policyholder and claims management application built using the MEAN stack. The project is divided into a Node.js/Express/MongoDB backend and an Angular/Nx frontend with the Duet Design System.

## 🏗️ Project Architecture

```text
ClaimLite/
├── frontend/
│   ├── claimlite/
│   │   ├── src/
│   │   ├── project.json
│   │   └── package.json
│   ├── package.json
│   ├── nx.json
│   └── README.md
│
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Claim.js
├── routes/
│   ├── userRoutes.js
│   └── claimRoutes.js
├── server.js
├── package.json
├── .env
├── README.md
└── ...
```

## 🚀 Features

### Policyholder Management
- Register a new policyholder
- Validate name, email and phone
- Prevent duplicate email addresses
- View all registered policyholders
- Display formatted phone numbers
- Display registration dates

### Claim Management
- Log an insurance claim
- Select a registered policyholder
- Select claim type
- Enter claim amount
- Enter claim description
- Validate claim information
- View all logged claims
- Display associated policyholder name

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Frontend
- Angular
- Nx
- TypeScript
- Duet Design System
- Angular Reactive Forms
- Angular HttpClient
- Vitest
- Playwright

## 🔌 API

The backend runs on:

```text
http://localhost:3000
```

API base URL:

```text
http://localhost:3000/api
```

### Policyholder APIs
- Get all policyholders: `GET /api/users`
- Create policyholder: `POST /api/users`

Example request body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

### Claim APIs
- Get all claims: `GET /api/claims`
- Create claim: `POST /api/claims`

Example request body:

```json
{
  "userId": "66f123456789abcdef123456",
  "claimType": "Health",
  "amount": 1250.5,
  "description": "Medical expenses for recent treatment"
}
```

## 👤 Policyholder Validation

The application validates:

- Full Name
  - Required
  - Minimum 2 characters
  - Maximum 50 characters
  - Cannot contain only whitespace
- Email
  - Required
  - Valid email format
  - Converted to lowercase before submission
  - Must be unique
- Phone
  - Required
  - Exactly 10 digits
  - Displayed in the UI as `(987) 654-3210`

## 📝 Claim Validation

### Policyholder
- A valid registered policyholder must be selected
- If no policyholders exist, the app displays:

```text
Action Required: You must register at least one Policyholder before logging a claim.
```

- Claim submission is disabled until a policyholder exists

### Claim Type
Supported values:
- Auto
- Home
- Health

### Amount
- Greater than 0
- Maximum 1,000,000
- Maximum 2 decimal places

Examples:
- `1250`
- `1250.5`
- `1250.50`

### Description
- Required
- Minimum 10 characters
- Maximum 500 characters

## 📋 User Interface

The frontend uses the Duet Design System for its main UI components.

The application contains:
- Home
- Policyholders
- Claims

### Policyholder page
- Policyholders
  - Add Policyholder

### Claims page
- Claims
  - Log Claim

## 🔄 Application Flow

```text
Policyholder
  ↓
Home
  ↓
Policyholders
  ↓
Add Policyholder
  ↓
Enter details
  ↓
Frontend validation
  ↓
POST /api/users
  ↓
Success / error response
  ↓
Policyholder list
```

```text
Claim
  ↓
Claims
  ↓
Log Claim
  ↓
Load policyholders
  ↓
Select policyholder
  ↓
Select claim type
  ↓
Enter amount
  ↓
Enter description
  ↓
Frontend validation
  ↓
POST /api/claims
  ↓
Success / error response
  ↓
Claims list
```

## ⚙️ Prerequisites

Install:
- Node.js
- npm
- MongoDB

Both backend and frontend dependencies must be installed before running the application.

## 📦 Backend Setup

Open a terminal in the project root:

```bash
npm install
```

Configure the backend `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/claimlite
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

## 🎨 Frontend Setup

Open a second terminal in the frontend directory:

```bash
cd frontend
npm install
npx nx serve claimlite
```

Open:

```text
http://localhost:4200
```

## 🔗 Local Development

Run the backend and frontend in separate terminals.

### Terminal 1
```bash
npm run dev
```

### Terminal 2
```bash
cd frontend
npx nx serve claimlite
```

Then open:

```text
http://localhost:4200
```

The frontend communicates with:

```text
http://localhost:3000/api
```

## 🏭 Production Build

From the frontend directory:

```bash
cd frontend
npx nx build claimlite
```

Build output:

```text
frontend/dist/apps/claimlite
```

The production build has been successfully verified.

## 🧪 Testing

The frontend workspace is configured with:
- Vitest for unit testing
- Playwright for end-to-end testing

Run unit tests:

```bash
cd frontend
npx nx test claimlite
```

## 🌐 Ports

| Application | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend | http://localhost:3000 |
| API | http://localhost:3000/api |

## ✅ Current Implementation Status

- ✅ Angular frontend
- ✅ Nx workspace
- ✅ Duet Design System
- ✅ Global navigation
- ✅ Landing page
- ✅ Policyholder registration
- ✅ Policyholder validation
- ✅ Duplicate email handling
- ✅ Policyholder list
- ✅ Claim registration
- ✅ Claim validation
- ✅ Dynamic policyholder selection
- ✅ Zero-policyholder protection
- ✅ Claims list
- ✅ Populated policyholder names
- ✅ Currency formatting
- ✅ Date formatting
- ✅ API error handling
- ✅ Loading/submission states
- ✅ MongoDB integration
- ✅ REST APIs
- ✅ Production frontend build

## 📌 Important Notes

The backend must be running before using the frontend because the frontend retrieves and submits data through the REST API.

For local development:

```text
Frontend → http://localhost:4200
           ↓
Backend  → http://localhost:3000
           ↓
MongoDB  → claimlite
```

## 📁 Backend Structure

```text
config/
  db.js
models/
  User.js
  Claim.js
routes/
  userRoutes.js
  claimRoutes.js
server.js
.env
package.json
```

## 🗄️ Database

The application uses MongoDB.

Database: `claimlite`

Main collections:
- `users`
- `claims`

Claims reference policyholders using MongoDB ObjectIds. The claim list uses backend population to retrieve the associated policyholder name.
