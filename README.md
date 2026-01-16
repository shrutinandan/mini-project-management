# Mini Project Management System
This project demonstrates the ability to design, implement, and document a production-quality full-stack application.

## 🛠️ Installation

### Prerequisites
- Node.js v18+

## Tech Stack
- Backend: Node.js, Express
- Frontend: React, TypeScript
- Testing: Jest + Supertest

## Running Backend
cd backend
npm install
npm run dev

## Running Frontend
cd frontend
npm install
npm run dev

## ⚙️ Environment Variables

### 🌐 Frontend (`.env`)
```
VITE_BACKEND_URL= # replace this with backend url.

```

---



### Local Execution

1. **Clone the repository**
```bash
git clone https://github.com/shrutinandan/mini-project-management
cd frontend
```
Create a .env file and paste the below env. Change the value according to your requirement

Run the following commands to get the app running :

```
npm install
```
```
npm run dev
```


2. **Backend**

Run the following commands to get the app running :

```
npm install
```
```
npm run dev
```

---

## Architecture
- Layered backend architecture
┌────────────────────────────┐
│        Routes Layer        │  ← Express routes
│  (URL → Controller)        │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│      Controller Layer      │  ← HTTP logic
│  (req, res, status codes)  │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│       Service Layer        │  ← Business rules
│  (validation, workflows)  │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│     Repository / DAO       │  ← Data access
│  (DB queries / storage)    │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│        Database            │
│  (Postgres / Mongo / etc)  │
└────────────────────────────┘

Folder structure
```
src/
│
├── routes/
│   ├── project.routes.js
│   └── task.routes.js
│
├── controllers/
│   ├── project.controller.js
│   └── task.controller.js
│
├── services/
│   ├── project.service.js
│   └── task.service.js
│
├── repositories/
│   ├── project.repository.js
│   └── task.repository.js
│
├── models/
│   ├── project.model.js
│   └── task.model.js
│
├── middlewares/
│   ├── error.middleware.js
│   ├── validate.middleware.js
│   └── auth.middleware.js
│
├── utils/
│   ├── ApiError.js
│   └── logger.js
│
├── app.js
└── server.js

```

- RESTful API design
- React hooks for state management

## Trade-offs
- In-memory DB used for speed
- For intial load the json file is been and then it is getting stored in in memory
- No authentication to keep scope focused

## Improvements With More Time
- JWT authentication
- Persistent database
- Drag-and-drop task board
- More test coverage
- Optimised the modal with generic one
- Add 
