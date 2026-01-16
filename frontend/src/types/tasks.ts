export type TaskStatus = "pending" | "in-progress" | "completed";

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