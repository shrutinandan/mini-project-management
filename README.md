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

#### **Create Project**

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
  "id": "p1",
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "createdAt": "2026-01-16T10:00:00Z"
}
```

---

#### **List Projects**

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
    "createdAt": "2026-01-16T10:00:00Z"
  }
]
```

---

### **Tasks**

#### **Add Task to a Project**

```http
POST /api/projects/:projectId/tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Design database schema",
  "description": "Create schema for task management",
}
```

**Response:**

```json

{
 "data":{
  "title": "Design database schema",
  "description": "Create schema for task management",
  "status": "pending",
  "createdAt": "26/02/2025"
    }, 
   "messgage":"Task successfully created"
}
```

---

#### **List Tasks for a Project**

```http
GET /api/projects/:projectId/tasks
Content-Type: application/json
```

**Response:**

```json
[
  {
    "id": "t1",
    "projectId": "p1",
    "title": "Design database schema",
    "description": "Create schema for task management",
    "status": "pending",
    "createdAt": "2026-01-16T10:05:00Z"
  }
]
```

---

#### **Update Task Status**

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
  "projectId": "p1",
  "title": "Design database schema",
  "description": "Create schema for task management",
  "status": "completed",
  "updatedAt": "2026-01-16T11:00:00Z"
}
```

#### **Delete a Task**

```http
DELETE /api/tasks/:taskId
Content-Type: application/json
```
**Response:**

```json
{
    "message": "Task deleted successfully",
    "data": {
        "id": "569535ec-9360-4192-98bf-bc2a7639292d"
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
- Add error bounday
- Added pagination but data should load according to page, offset and limit via fetchprojectlist api
- Add dropdown on TaskBoard page for changing the project to view its relevant tasks
