import { Grid, Column } from "@carbon/react";
import { ProjectList } from "../components/ProjectList/ProjectList";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard
 * ----------
 * Acts as the landing page after login.
 * Responsible only for:
 *  - Rendering the ProjectList
 *  - Handling navigation when a project is selected
 *
 * Business logic (fetching projects, creating projects, loading states)
 * is intentionally delegated to the ProjectList component.
 */
export const Dashboard = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  return (
    <Grid fullWidth>
      <Column sm={4} md={3} lg={16}>
        {/* 
          ProjectList is a reusable, self-contained component.
          When a project is selected, we navigate to the Task Board page
          using projectId and projectName as route parameters.
        */}
        <ProjectList
          onSelect={(projectId, projectName) =>
            navigate(`/tasks/${projectId}/${projectName}`)
          }
        />
      </Column>
    </Grid>
  );
};
