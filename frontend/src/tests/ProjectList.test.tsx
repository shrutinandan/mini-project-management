// ProjectList.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectList } from "../components/ProjectList/ProjectList";
import * as projectApi from "../services/project.api"

// Mock the project API using Vitest
vi.mock("../../services/project.api", () => ({
  getProjects: vi.fn(),
  createProject: vi.fn(),
}));

const mockProjects = [
  { id: "p1", name: "Project 1", description: "Desc 1" },
  { id: "p2", name: "Project 2", description: "Desc 2" },
];

describe("ProjectList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock API responses
    (projectApi.getProjects as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockProjects);
    (projectApi.createProject as unknown as ReturnType<typeof vi.fn>).mockImplementation(async (name: string, description: string) => ({
      id: "p3",
      name,
      description,
    }));
  });

  it("renders skeleton initially and then shows projects", async () => {
    render(<ProjectList onSelect={vi.fn()} />);

    // Skeleton should appear
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText("Project 1")).toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });

    // Skeleton should disappear
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("can create a new project", async () => {
    render(<ProjectList onSelect={vi.fn()} />);
    await waitFor(() => screen.getByText("Project 1"));

    fireEvent.click(screen.getByText("Create Project"));

    const nameInput = screen.getByPlaceholderText(/project name/i);
    const descInput = screen.getByPlaceholderText(/description/i);

    await userEvent.type(nameInput, "Project 3");
    await userEvent.type(descInput, "Desc 3");

    fireEvent.click(screen.getByText(/save/i));

    // Wait for project to appear
    await waitFor(() => screen.getByText("Project 3"));

    // Notification should appear
    expect(screen.getByText(/successfully added/i)).toBeInTheDocument();
  });

  it("calls onSelect when 'View Tasks' clicked", async () => {
    const onSelectMock = vi.fn();
    render(<ProjectList onSelect={onSelectMock} />);

    await waitFor(() => screen.getByText("Project 1"));

    fireEvent.click(screen.getAllByText("View Tasks")[0]);
    expect(onSelectMock).toHaveBeenCalledWith("p1", "Project 1");
  });

  it("search filters projects correctly", async () => {
    render(<ProjectList onSelect={vi.fn()} />);
    await waitFor(() => screen.getByText("Project 1"));

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Project 2" } });

    expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });
});
