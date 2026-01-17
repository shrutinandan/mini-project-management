# Mini Project Management System
This project demonstrates the ability to design, implement, and document a production-quality full-stack application.

## 🛠️ Installation

### Prerequisites
- Node.js v18+

## Tech Stack
- Backend: Node.js, Express
- Frontend: React, TypeScript
- Testing: Jest + Supertest


## ⚙️ Environment Variables

### 🌐 Frontend (`.env`)
```
VITE_BACKEND_URL= # replace this with backend url.
VITE_ENVNAME=DEV. #value should be DEV | PROD


```

---



### Local Execution

1. **Clone the repository**
```bash
git clone https://github.com/shrutinandan/mini-project-management
```

2. **Run Frontend**

```
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


3. **Run Backend**

Run the following commands to get the app running :

```
cd backend
```

```
npm install
```
```
npm run dev
```

---

## Architecture

## 🏗 Backend Architecture

This project follows a **layered Express.js backend architecture** to ensure
separation of concerns, scalability, and maintainability.

### Architecture Diagram

![Backend Architecture](/assets/architecture.png)

### Architecture Layers

1. **Routing Layer (`/src/routes`)**
   - Maps HTTP routes to controllers
   - No business logic

2. **Middleware Layer (`/src/middlewares`)**
   - Request validation
   - Centralized error handling

3. **Controller Layer (`/src/controllers`)**
   - Handles HTTP request/response
   - Delegates logic to services

4. **Service Layer (`/src/services`)**
   - Contains core business logic
   - Coordinates data access

5. **Data Layer (`/src/data`)**
   - File-based storage (`tasks.json`, `projects.json`)
   - Accessed via `store.js`

This architecture allows the backend to evolve easily from file-based storage
to a real database without impacting controllers or routes.

## UI SCREENS
1. Project Screen

![Project Screen](/assets/project_screen.png)

2. TaskBoard Screen

![Task Board Screen](/assets/taskboard_screen.png)

### RESTful API design

## **API Endpoints**

### **Projects**

#### **1. Create Project**

```http
POST /api/projects
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website"
}
```

**Response:**

```json
{
    "message": "Project created successfully",
    "data": {
        "id": "ff637b15-da6d-41b1-bf91-398e563c2eba",
        "name": "Website Redesign",
        "description": "Redesign the company website"
    }
}
```

---

#### **2. List Projects**

```http
GET /api/projects
Authorization: Bearer <your-token>
```

**Response:**

```json
[
  {
    "id": "p1",
    "name": "Website Redesign",
    "description": "Redesign the company website",
  }
]
```

---

### **Tasks**

#### **1. Add Task to a Project**

```http
POST /api/projects/:projectId/tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Design database schema",
}
```

**Response:**

```json

{
    "message": "Task created successfully",
    "data": {
        "id": "35b56796-5610-4815-a438-06532d432e0c",
        "projectId": "7fc488ad-6c46-4fc0-9182-a579748548e6",
        "title": "Design database schema",
        "status": "pending",
        "createdAt": "2026-01-16T20:06:29.080Z"
    }
}
```

---

#### **2. List Tasks for a Project**

```http
GET /api/projects/:projectId/tasks
Content-Type: application/json
```

**Response:**

```json
[
  {
    "id": "t1",
    "projectId": "7fc488ad-6c46-4fc0-9182-a579748548e6",
    "title": "Design database schema",
    "status": "pending",
    "createdAt": "2026-01-16T10:05:00Z"
  }
]
```

---

#### **3. Update Task Status**

```http
PUT /api/tasks/:taskId
Content-Type: application/json
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "id": "t1",
  "projectId": "7fc488ad-6c46-4fc0-9182-a579748548e6",
  "title": "Design database schema",
  "status": "completed",
  "createdAt": "2026-01-16T11:00:00Z"
}
```

#### **4. Delete a Task**

```http
DELETE /api/tasks/:taskId
Content-Type: application/json
```
**Response:**

```json
{
    "message": "Task deleted successfully",
    "data": {
        "id": "t1"
    }
}
```


---

## **HTTP Status Codes**

| Code | Meaning                       |
|------|-------------------------------|
| 200  | OK – Request succeeded        |
| 201  | Created – Resource created    |
| 400  | Bad Request – Invalid input   |
| 401  | Unauthorized – Authentication required |
| 404  | Not Found – Resource not found |
| 500  | Internal Server Error         |



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
- Need to add redux for state management
- Add more messages for error bounday 
- Added pagination but data should load according to page, offset and limit via fetchprojectlist api
- Add dropdown on TaskBoard page for changing the project to view its relevant tasks
