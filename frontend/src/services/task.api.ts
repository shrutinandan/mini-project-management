import { apiClient } from "../config/axios";
import type { Task, TaskResponse, TaskStatus } from "../types/tasks";


/**
 * Fetch all tasks for a specific project.
 *
 * Sends a GET request to retrieve the list of tasks
 * associated with the given project ID.
 *
 * @param projectId - Unique identifier of the project
 *
 * @returns A promise that resolves to an array of tasks.
 *          Returns an empty array if no tasks are found.
 *
 * @throws Error when the API request fails
 */
export const fetchTasksByProjectId = async (
  projectId: string
): Promise<Task[]> => {
  const res = await apiClient.get(
    `/api/v1/projects/${projectId}/tasks`
  );

  return res.data ?? [];
};


/**
 * Create a new task under a specific project.
 *
 * Sends a POST request to the backend to create a task
 * and normalizes the response before returning it to the UI.
 *
 * @param projectId - Unique identifier of the project
 * @param title - Title of the task to be created
 *
 * @returns A promise that resolves to the created task response,
 *          containing a success message and the task data.
 *
 * @throws Error when the API request fails or the response is invalid
 */
export const createTask = async (
  projectId: string,
  title: string
): Promise<TaskResponse> => {
  try {
    const res = await apiClient.post(
      `/api/v1/projects/${projectId}/tasks`,
      { title }
    );

    const response = res.data as any; // 👈 backend returns { message, data }

    if (!response?.data?.id) {
      throw new Error("Invalid task response");
    }

    return {
      message: response.message,
      data: response.data
    };
    
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to create task"
    );
  }
};


/**
 * Updates the status of a task
 *
 * @param taskId - ID of the task to update
 * @param status - New status for the task
 * @returns Updated task object
 */
export const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus
): Promise<Task> => {
  const res = await apiClient.put(`/api/v1/tasks/${taskId}`, { status });

  // Defensive return in case API wraps response
  return res.data?.data ?? res.data;
};


/**
 * Delete an existing task.
 *
 * Sends a DELETE request to remove a task by its ID.
 * The backend responds with a confirmation message and
 * the ID of the deleted task.
 *
 * @param taskId - Unique identifier of the task to be deleted
 *
 * @returns A promise that resolves to an object containing
 *          a success message and the deleted task ID
 *
 * @throws Error when the API request fails or deletion is unsuccessful
 */
export const deleteTask = async (taskId: string) => {
  try {
    const res: any = await apiClient.delete(`/api/v1/tasks/${taskId}`);

    return {
      message: res?.data?.message || '',
      id: res?.data.data.id|| ''
    };
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to delete task"
    );
  }
};

