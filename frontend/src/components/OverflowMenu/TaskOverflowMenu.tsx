import {
  OverflowMenu,
  OverflowMenuItem
} from "@carbon/react";
import type { TaskStatus } from "../../types";

interface Props {
  currentStatus: TaskStatus;
  onMove: (status: TaskStatus) => void;
  onDelete: () => void;
}

export const TaskOverflowMenu = ({
  currentStatus,
  onMove,
  onDelete
}: Props) => {
  return (
    <OverflowMenu size="sm" ariaLabel="Task actions">

      {currentStatus !== "pending" && (
        <OverflowMenuItem
          itemText="Move to Pending"
          onClick={() => onMove("pending")}
        />
      )}

      {currentStatus !== "in-progress" && (
        <OverflowMenuItem
          itemText="Move to In Progress"
          onClick={() => onMove("in-progress")}
        />
      )}

      {currentStatus !== "completed" && (
        <OverflowMenuItem
          itemText="Move to Completed"
          onClick={() => onMove("completed")}
        />
      )}

      <OverflowMenuItem
        hasDivider
        isDelete
        itemText="Delete"
        onClick={onDelete}
      />
    </OverflowMenu>
  );
};
