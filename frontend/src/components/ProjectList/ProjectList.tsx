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

import type { Project } from "../../types";
import { getProjects, createProject } from "../../services/project.api";
// import { fetchTasksByProjectId } from "../../services/task.api";
import { CreateProjectModal } from "../modal/CreateProjectModal";
import { Add } from "@carbon/icons-react";

interface Props {
  onSelect: (id: string, name: string) => void;
}


type NotificationKind = "error" | "info" | "info-square" | "success" | "warning" | "warning-alt" | undefined

export const ProjectList = memo(({ onSelect }: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [project, setProject] = useState({ name: '', description: '' });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState(
    "Server is not reachable"
  );
  const [notificationKind, setNotificationKind] = useState<NotificationKind>("info");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const projectListData = useMemo(() => {
    const start = (page - 1) * limit;
    return projects.slice(start, start + limit);
  }, [projects, page, limit]);



  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new project
  const handleCreate = useCallback(
  async (name: string, description: string) => {
    try {
      const response = await createProject(name, description);

      setProjects(prev => [...prev, response]);
      setShowNotification(true);
      setNotificationKind("success");
      setNotificationTitle("Successfully added");
    } catch (err: any) {
      console.error("Failed to create project:", err);
      setShowNotification(true);
      setNotificationKind("error");
      setNotificationTitle(
        err?.error || "Failed to create project"
      );
    }
  },
  [] // ✅ no state dependency
);



  const handleSelect = useCallback(
    (projectId: string, projectName: string) => {
      onSelect(projectId, projectName);
    },
    [onSelect]
  );





  // Filtered rows based on search
  const filteredProjects = useMemo(() => {
    if (!searchText.trim()) return projects;
    return projects.filter(
      p =>
        p.id.toLowerCase().includes(searchText.toLowerCase()) ||
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
    );
  }, [projects, searchText]);

  // Carbon headers
  const headers = useMemo(
    () => [
      { key: "name", header: "Project Name" },
      { key: "description", header: "Description" },
      { key: "actions", header: "Actions" }
    ],
    []
  );

  // Convert projects to rows
  const rows = useMemo(() => {
    return filteredProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description || "",
      actions: project.id
    }));
  }, [filteredProjects]);

  const paginatedRows = useMemo(() => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return rows.slice(start, end);
}, [rows, page, limit]);


  // Render cell content
  const getCellComponent = (cell: DataTableCell<any>) => {
    const columnId = cell.id.split(":")[1];

    switch (columnId) {
      case "actions":
        const selectedProject = projects.find(
          (p) => p.id === cell.value
        );
        return (
          <TableCell key={cell.id}>
            <Button size="sm" kind="ghost" onClick={() => {
              handleSelect(
                cell?.value ?? "",
                selectedProject?.name ?? ""
              )

              // navigate("/taskboard")
            }}>
              View Tasks
            </Button>
          </TableCell>
        );
      default:
        return <TableCell key={cell.id}>{cell.value}</TableCell>;
    }
  };

  return (
    <>  {showNotification && (
      <InlineNotification

        lowContrast
        title={notificationTitle}
        kind={notificationKind}
        style={{ marginBottom: '2rem' }}
      />
    )}
      <Grid fullWidth>

        {/* Bottom Row: DataTable or Skeleton */}
        <Column sm={4} md={8} lg={12}>
          {loading ? (
            <DataTableSkeleton columnCount={3} rowCount={5} headers={headers} compact />
          ) : (
            <>
            <DataTable rows={paginatedRows} headers={headers}>
              {({ rows, headers, getHeaderProps, getRowProps, getTableContainerProps }) => (
                <TableContainer {...getTableContainerProps()} title="Projects">
                  {/* Search Toolbar */}
                  <TableToolbar>
                    <TableToolbarSearch
                      persistent
                      onChange={(e: any) => setSearchText(e.target.value as any)}
                    // label="Search Projects"
                    />
                    <Button
                      renderIcon={Add}

                      onClick={() => setOpenModal(true)}
                    >
                      Create Project
                    </Button>
                  </TableToolbar>

                  <Table size="lg">
                    <TableHead>
                      <TableRow >
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
                          <TableRow key={key} >
                            {row.cells.map(cell => getCellComponent(cell))}
                          </TableRow>
                        );
                      })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DataTable>
               <Pagination
                      totalItems={rows.length}
                      pageSize={limit}
                      pageSizes={[5, 10, 20]}
                      page={page}
                      onChange={({ page, pageSize }) => {
                        setPage(page);
                        setLimit(pageSize);
                      }}
                     
                    />
            </>
          )}
          <CreateProjectModal
            open={openModal}
            project={project}
            setProject={setProject}
            onClose={() => setOpenModal(false)}
            onSave={handleCreate}
          />
        </Column>
      </Grid>
    </>
  );
});
