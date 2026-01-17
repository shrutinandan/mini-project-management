import { apiClient } from "../config/axios";
import type { Project, ProjectResponse } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const res = await apiClient.get("/api/v1/projects");
  return res.data ?? [];
};


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



