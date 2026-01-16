import { Stack, Tile } from "@carbon/react";
import { memo } from "react";

import { TaskCard } from "../TaskCard/TaskCard";
import type { Task, TaskStatus } from "../../types/tasks";

interface Props {
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export const TaskColumn = memo(
  ({ title, tasks, onStatusChange, onDelete }: Props) => {
    return (
      <Stack gap={3}>
        <h4>{title}</h4>

        {tasks.map(task => (
          <Tile key={task.id}>
            <TaskCard
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </Tile>
        ))}
      </Stack>
    );
  }
);
