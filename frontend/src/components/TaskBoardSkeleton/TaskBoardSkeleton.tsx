import { Grid, Column, SkeletonText, SkeletonPlaceholder } from "@carbon/react";

export const TaskBoardSkeleton = () => {
  return (
    <Grid fullWidth>
      {[1, 2, 3].map(col => (
        <Column key={col} lg={4} md={4} sm={4}>
          <SkeletonText heading width="50%" />
          <SkeletonPlaceholder style={{ height: "80px", marginBottom: "1rem" }} />
          <SkeletonPlaceholder style={{ height: "80px", marginBottom: "1rem" }} />
          <SkeletonPlaceholder style={{ height: "80px" }} />
        </Column>
      ))}
    </Grid>
  );
};
