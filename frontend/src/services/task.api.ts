import { apiClient } from "./axios";
import type { Project, Task, TaskResponse, TaskStatus } from "../types";

/*** Get all tasks for a project ***/
export const fetchTasksByProjectId = (projectId: string): Promise<Task[]> =>
  apiClient.get(`/api/v1/projects/${projectId}/tasks`);

/*** Create task ***/

export const createTask = async (
  projectId: string,
  title: string
): Promise<TaskResponse> => {
  try {
    const res = await apiClient.post(
      `/api/v1/projects/${projectId}/tasks`,
      { title }
    );

    const response = res as any; // 👈 backend returns { message, data }
    console.log('response', response)

    if (!response?.data?.id) {
      throw new Error("Invalid task response");
    }

    return {
      message: response.message,
      data: {
        id: response.data.id,
        title: response.data.title,
        projectId,
        status: response.data.status ?? "pending",
        createdAt:
          response.data.createdAt ?? new Date().toISOString()
      }
    };
    
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to create task"
    );
  }
};



/*** Update task status ***/
export const updateTaskStatus = (
  taskId: string,
  status: TaskStatus
): Promise<Task> =>
  apiClient.put(`/api/v1/tasks/${taskId}`, { status });

/*** Delete task ***/
export const deleteTask = async (taskId: string) => {
  try {
    const res: any = await apiClient.delete(`/api/v1/tasks/${taskId}`);
    console.log('res api', res)

    return {
      message: res.message,
      id: res.data.id
    };
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to delete task"
    );
  }
};

