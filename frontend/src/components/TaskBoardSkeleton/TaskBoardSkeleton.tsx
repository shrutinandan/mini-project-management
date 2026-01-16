import {
  Grid,
  Column,
  SkeletonText
} from "@carbon/react";

import "./TaskBoardSkeleton.scss";

const COLUMN_COUNT = 3;
const TASKS_PER_COLUMN = 3;

export const TaskBoardSkeleton = () => {
  return (
    <Grid fullWidth className="taskboard-skeleton">
      {Array.from({ length: COLUMN_COUNT }).map((_, columnIndex) => (
        <Column
          key={`skeleton-column-${columnIndex}`}
          lg={4}
          md={4}
          sm={4}
        >
          {/* Column heading */}
          <SkeletonText heading width="60%" />

          {/* Task card skeletons */}
          {Array.from({ length: TASKS_PER_COLUMN }).map((_, taskIndex) => (
            <div
              key={`skeleton-task-${columnIndex}-${taskIndex}`}
              className="task-skeleton-card"
            >
              {/* Title */}
              <SkeletonText width="80%" />

              {/* Description */}
              <SkeletonText width="95%" />
              <SkeletonText width="85%" />

              {/* Comments */}
              <SkeletonText width="40%" />
            </div>
          ))}
        </Column>
      ))}
    </Grid>
  );
};
