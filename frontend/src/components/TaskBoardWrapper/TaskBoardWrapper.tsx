import { useParams } from "react-router-dom";
import { TaskBoard } from "../TaskBoard/TaskBoard";

export const TaskBoardWrapper = () => {
  const { projectId, projectName } = useParams<{
    projectId?: string;
    projectName?: string;
  }>();

  if (!projectId || !projectName) {
    return <div>No project selected</div>;
  }

  // ⬇️ TypeScript now KNOWS both are strings
  return (
    <TaskBoard
      projectId={projectId}
      projectName={decodeURIComponent(projectName)}
    />
  );
};

