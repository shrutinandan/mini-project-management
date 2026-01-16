import { Grid, Column, SkeletonText, SkeletonPlaceholder } from "@carbon/react";
import "./TaskBoardSkeleton.scss";

export const TaskBoardSkeleton = () => {
  return (
    <Grid fullWidth className="taskboard-skeleton">
      {[1, 2, 3].map(col => (
        <Column key={col} lg={4} md={4} sm={4}>
          <SkeletonText heading width="70%" />
          
        <SkeletonPlaceholder className="taskboard-skeleton-placeholder"  />
        <SkeletonPlaceholder className="taskboard-skeleton-placeholder"  />
        <SkeletonPlaceholder className="taskboard-skeleton-placeholder"  />
        </Column>
      ))}
    </Grid>
  );
};
