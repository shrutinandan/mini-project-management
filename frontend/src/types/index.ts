// Task status values supported by the backend
export type TaskStatus = "pending" | "in-progress" | "completed";

// Project model
export interface Project {
  id: string;
  name: string;
  description?: string;
}

// Task model
export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}
export interface TaskResponse {
  data: Task,
  message: string
}