import { Grid, Column } from "@carbon/react";
import { useState } from "react";
import { ProjectList } from "../components/ProjectList/ProjectList";
import { TaskBoard } from "../components/TaskBoard/TaskBoard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const navigate = useNavigate()

  return (
    <Grid fullWidth >
      
      <Column sm={4} md={3} lg={16 }>
        <ProjectList
          onSelect={(projectId, projectName) => navigate(`/tasks/${projectId}/${projectName}`)}
        />
      </Column>
{/* 
      <Column sm={4} md={5} lg={16}>
       {selectedProjectId && <TaskBoard projectId={selectedProjectId} />}
      </Column> */}
    </Grid>
  );
};
