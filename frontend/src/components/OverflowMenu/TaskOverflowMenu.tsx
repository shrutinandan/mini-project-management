import {
  OverflowMenu,
  OverflowMenuItem
} from "@carbon/react";
import type { TaskStatus } from "../../types";

interface Props {
  onMove: (status: TaskStatus) => void;
  onDelete: () => void;
}

export const TaskOverflowMenu = ({ onMove, onDelete }: Props) => {
  return (
    <OverflowMenu size="sm" ariaLabel="Task actions">
      <OverflowMenuItem
        itemText="Move to Pending"
        onClick={() => onMove("pending")}
      />
      <OverflowMenuItem
        itemText="Move to In Progress"
        onClick={() => onMove("in-progress")}
      />
      <OverflowMenuItem
        itemText="Move to Completed"
        onClick={() => onMove("completed")}
      />
      <OverflowMenuItem
        hasDivider
        isDelete
        itemText="Delete"
        onClick={onDelete}
      />
    </OverflowMenu>
  );
};
