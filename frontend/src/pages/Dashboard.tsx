import { Grid, Column } from "@carbon/react";
import { ProjectList } from "../components/ProjectList/ProjectList";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <Grid fullWidth >
      
      <Column sm={4} md={3} lg={16 }>
        <ProjectList
          onSelect={(projectId, projectName) => navigate(`/tasks/${projectId}/${projectName}`)}
        />
      </Column>
    </Grid>
  );
};
