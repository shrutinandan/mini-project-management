import { Stack, Tag } from "@carbon/react";
import { memo, useCallback } from "react";
import type { Task, TaskStatus } from "../../types";
import { TaskOverflowMenu } from "../OverflowMenu/TaskOverflowMenu";
import type { TagProps } from "@carbon/react";

interface Props {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}




const statusMap: Record<
  TaskStatus,
  { label: string; type: TagProps<"span">["type"] }
> = {
  pending: { label: "Pending", type: "gray" },
  "in-progress": { label: "In progress", type: "blue" },
  completed: { label: "Completed", type: "green" }
};

export const TaskCard = memo(({ task, onStatusChange, onDelete }: Props) => {
  const handleMove = useCallback(
    (status: TaskStatus) => {
      onStatusChange(task.id, status);
    },
    [task.id, onStatusChange]
    
  );

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <Stack gap={2}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}
      >
        <strong style={{ fontSize: "20px" }}>{task.title}</strong>

        <TaskOverflowMenu
          onMove={handleMove}
          onDelete={handleDelete}
          currentStatus={task.status}
        />
      </div>

      <Tag type={statusMap[task.status].type} size="sm">
        {statusMap[task.status].label}
      </Tag>

      <span style={{ fontSize: "0.75rem", color: "#8d8d8d" }}>
        Created{" "}
        {new Date(task.createdAt).toLocaleDateString()}
      </span>
    </Stack>
  );
});
