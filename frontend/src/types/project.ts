export interface Project {
  id: string;
  name: string;
  description?: string;
}
export interface ProjectResponse {
  data: Project,
  message: string
}