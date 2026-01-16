# Project & Task Management API

A RESTful API for managing **Projects** and **Tasks**, allowing creation, listing, and status updates. Built with Node.js and Express.js (or your preferred backend).

---

## **Base URL**

```
http://your-domain.com/api
```

> Replace with your actual API domain.

---

## **Authentication**

If enabled, include the following header in requests:

```http
Authorization: Bearer <your-token>
```

---

## **Getting Started**

### **Install dependencies**

```bash
npm install
```

### **Run the server**

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

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
  "status": "pending"
}
```

**Response:**

```json
{
  "id": "t1",
  "projectId": "p1",
  "title": "Design database schema",
  "description": "Create schema for task management",
  "status": "pending",
  "createdAt": "2026-01-16T10:05:00Z"
}
```

---

#### **List Tasks for a Project**

```http
GET /api/projects/:projectId/tasks
Authorization: Bearer <your-token>
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

---

## **Project Structure (Example)**

```
/project-root
│
├─ /routes
│   ├─ projects.js
│   └─ tasks.js
│
├─ /controllers
│   ├─ projectController.js
│   └─ taskController.js
│
├─ /models
│   ├─ projectModel.js
│   └─ taskModel.js
│
├─ server.js
└─ package.json
```

---

## **Notes / Best Practices**

- Use **plural nouns** for endpoints (`/projects`, `/tasks`).  
- Use **HTTP verbs** appropriately (GET, POST, PUT).  
- Include **timestamps** (`createdAt`, `updatedAt`) in resources.  
- Support **status updates** for tasks using `PUT /tasks/:taskId`.  
- Consider adding **pagination, filtering, and sorting** for project and task lists.

