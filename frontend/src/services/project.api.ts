import { apiClient } from "../config/axios";
import type { Project } from "../types/project";


export const getProjects = (): Promise<Project[]> =>
  apiClient.get("/api/v1/projects");

export const createProject = (name: string, description: string): Promise<Project> =>
  apiClient.post("/api/v1/projects", { name, description });


