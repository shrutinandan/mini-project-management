import { apiClient } from "../config/axios";
import type { Project, ProjectResponse } from "../types/project";


export const getProjects = (): Promise<Project[]> =>
  apiClient.get("/api/v1/projects");

export const createProject = async (
  name: string,
  description: string
): Promise<ProjectResponse> => {
  try {
    const res = await apiClient.post(
      "/api/v1/projects",
      { name, description }
    );

    const response = res as any; // backend returns { message, data }

    if (!response?.data?.id) {
      throw new Error("Invalid project response");
    }

    return {
      message: response.message,
      data: {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description ?? "",
      }
    };
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to create project"
    );
  }
};



