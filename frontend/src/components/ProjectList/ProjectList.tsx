/**
 * ProjectList.tsx
 *
 * Displays a paginated list of projects with search and filtering.
 * Features:
 * - Initial skeleton while fetching projects
 * - Create project via modal with loading overlay
 * - Notifications for success/error actions
 * - Pagination support
 * - Disable buttons during loading to prevent double actions
 */

import { useEffect, useState, useCallback, useMemo, memo } from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Grid,
  Column,
  DataTableSkeleton,
  TableToolbar,
  TableToolbarSearch,
  type DataTableCell,
  InlineNotification,
  Pagination
} from "@carbon/react";


import { getProjects, createProject } from "../../services/project.api";
import { CreateProjectModal } from "../modal/CreateProjectModal";
import { Add } from "@carbon/icons-react";
import { LoadingOverlay } from "../common/LoadingOverlay";
import { delay } from "../../utils/delay";
import type { Project } from "../../types/project";
import type { NotificationKind } from "../../types";

interface Props {
  /** Callback when user selects a project to view tasks */
  onSelect: (id: string, name: string) => void;
}

export const ProjectList = memo(({ onSelect }: Props) => {
  // ------------------------------
  // Component state
  // ------------------------------
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState({ name: "", description: "" }); // modal inputs
  const [loading, setLoading] = useState(false); // shows overlay while creating project
  const [loadingSkeleton, setLoadingSkeleton] = useState(false); // shows skeleton while initial fetch
  const [searchText, setSearchText] = useState(""); // search input
  const [openModal, setOpenModal] = useState(false); // modal visibility
  const [showNotification, setShowNotification] = useState(false); // show notifications
  const [notificationTitle, setNotificationTitle] = useState("Server is not reachable");
  const [notificationKind, setNotificationKind] = useState<NotificationKind>("info");

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // ------------------------------
  // Fetch projects on mount
  // ------------------------------
  useEffect(() => {
    fetchProjects();
  }, []);

  // ------------------------------
  // Fetch all projects
  // ------------------------------
  const fetchProjects = useCallback(async () => {
    setLoadingSkeleton(true);

    // Artificial delay for dev env
    if (import.meta.env.VITE_ENVNAME === "DEV") {
      await delay(500);
    }

    try {
      const response = await getProjects();
      setProjects(response || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setShowNotification(true);
      setNotificationKind("error");
      setNotificationTitle("Failed to fetch projects");
    } finally {
      setLoadingSkeleton(false);
    }
  }, []);

  // ------------------------------
  // Handle creating a new project
  // ------------------------------
  const handleCreate = useCallback(
    async (name: string, description: string) => {
      // Close modal immediately on submit
      setOpenModal(false);

      // Show overlay spinner
      setLoading(true);

      if (import.meta.env.VITE_ENVNAME === "DEV") {
        await delay(1000);
      }

      try {
        const response = await createProject(name, description);

        // Add new project to state
        setProjects(prev => [...prev, response.data]);

        // Show success notification
        setNotificationKind("success");
        setNotificationTitle(response.message? response.message : "Project created successfully");
        setShowNotification(true);
      } catch (err: any) {
        console.error("Failed to create project:", err);
        setNotificationKind("error");
        setNotificationTitle(err?.error || "Failed to create project");
        setShowNotification(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ------------------------------
  // Handle selecting a project
  // ------------------------------
  const handleSelect = useCallback(
    (projectId: string, projectName: string) => {
      onSelect(projectId, projectName);
    },
    [onSelect]
  );

  // ------------------------------
  // Filter projects based on search input
  // ------------------------------
  const filteredProjects = useMemo(() => {
    if (!searchText.trim()) return projects;
    return projects.filter(
      p =>
        p.id.toLowerCase().includes(searchText.toLowerCase()) ||
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
    );
  }, [projects, searchText]);

  // ------------------------------
  // Carbon DataTable headers
  // ------------------------------
  const headers = useMemo(
    () => [
      { key: "name", header: "Project Name" },
      { key: "description", header: "Description" },
      { key: "actions", header: "Actions" }
    ],
    []
  );

  // ------------------------------
  // Convert filtered projects to table rows
  // ------------------------------
  const rows = useMemo(() => {
    return filteredProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description || "",
      actions: project.id
    }));
  }, [filteredProjects]);

  // ------------------------------
  // Paginate rows for current page
  // ------------------------------
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * limit;
    return rows.slice(start, start + limit);
  }, [rows, page, limit]);

  // ------------------------------
  // Render table cells
  // ------------------------------
  const getCellComponent = (cell: DataTableCell<any>) => {
    const columnId = cell.id.split(":")[1];

    switch (columnId) {
      case "actions":
        const selectedProject = projects.find(p => p.id === cell.value);
        return (
          <TableCell key={cell.id}>
            <Button
              size="sm"
              kind="ghost"
              disabled={loading} // disable while creating project
              onClick={() => handleSelect(cell?.value ?? "", selectedProject?.name ?? "")}
            >
              View Tasks
            </Button>
          </TableCell>
        );
      default:
        return <TableCell key={cell.id}>{cell.value}</TableCell>;
    }
  };

  // ------------------------------
  // Render component
  // ------------------------------
  return (
    <>
      {/* Inline notifications for success/error */}
      {showNotification && (
        <InlineNotification
          lowContrast
          title={notificationTitle}
          kind={notificationKind}
          style={{ marginBottom: "2rem" }}
        />
      )}

      <Grid fullWidth>
        <Column sm={4} md={8} lg={12}>
          {/* Show skeleton during initial fetch */}
          {loadingSkeleton ? (
            <DataTableSkeleton columnCount={3} rowCount={5} headers={headers} compact />
          ) : (
            <>
              {/* DataTable for projects */}
              <DataTable rows={paginatedRows} headers={headers}>
                {({ rows, headers, getHeaderProps, getRowProps, getTableContainerProps }) => (
                  <TableContainer {...getTableContainerProps()} title="Projects">
                    {/* Toolbar: search + create project */}
                    <TableToolbar>
                      <TableToolbarSearch
                        persistent
                        onChange={(e: any) => setSearchText(e.target.value)}
                      />
                      <Button
                        renderIcon={Add}
                        disabled={loading} // disable button while creating project
                        onClick={() => setOpenModal(true)}
                      >
                        Create Project
                      </Button>
                    </TableToolbar>

                    <Table size="lg">
                      <TableHead>
                        <TableRow>
                          {headers.map(header => {
                            const { key, ...headerProps } = getHeaderProps({ header });
                            return <TableHeader key={key} {...headerProps}>{header.header}</TableHeader>;
                          })}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {rows.map(row => {
                          const rowProps = getRowProps({ row });
                          const { key } = rowProps;
                          return (
                            <TableRow key={key}>
                              {row.cells.map(cell => getCellComponent(cell))}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>

              {/* Pagination */}
              <Pagination
                totalItems={rows.length}
                pageSize={limit}
                pageSizes={[5, 10, 15]}
                page={page}
                onChange={({ page, pageSize }) => {
                  setPage(page);
                  setLimit(pageSize);
                }}
              />
            </>
          )}

          {/* Modal for adding project */}
          <CreateProjectModal
            open={openModal}
            project={project}
            setProject={setProject}
            onClose={() => setOpenModal(false)}
            onSave={handleCreate}
          />

          {/* Loading overlay for creating project */}
          <LoadingOverlay loading={loading} text="Creating a project..." />
        </Column>
      </Grid>
    </>
  );
});
