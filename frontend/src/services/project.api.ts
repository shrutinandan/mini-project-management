/**
 * projectService.ts
 * 
 * This service module provides API functions to interact with the backend
 * for managing Projects. It uses Axios configured via `apiClient` to make
 * HTTP requests to the Node.js/Express backend.
 * 
 * Features:
 * - Fetch all projects
 * - Create a new project
 * 
 * Note: This service assumes the backend response has the structure:
 * {
 *   message: string;
 *   data: Project;
 * }
 */
import { apiClient } from "../config/axios";
import type { Project, ProjectResponse } from "../types/project";


/**
 * Fetch all projects from the backend.
 * 
 * GET /api/v1/projects
 * 
 * @returns {Promise<Project[]>} - Returns an array of Project objects.
 *                                  Returns empty array if no data found.
 */
export const getProjects = async (): Promise<Project[]> => {
  const res = await apiClient.get("/api/v1/projects");
  return res.data ?? [];
};



/**
 * Create a new project.
 * 
 * POST /api/v1/projects
 * 
 * @param {string} name - Name of the project
 * @param {string} description - Description of the project
 * 
 * @returns {Promise<ProjectResponse>} - Returns an object with:
 *   - message: string (success message from backend)
 *   - data: Project (the newly created project object)
 * 
 * @throws Error if the API call fails or response is invalid
 */
export const createProject = async (
  name: string,
  description: string
): Promise<ProjectResponse> => {
  try {
    const res = await apiClient.post(
      "/api/v1/projects",
      { name, description }
    );

    const response = res.data; // backend returns { message, data }

    if (!response?.data?.id) {
      throw new Error("Invalid project response");
    }

    return {
      message: response.message,
      data: response.data
    };
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to create project"
    );
  }
};



