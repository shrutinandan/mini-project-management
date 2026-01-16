/**
 * TaskBoard.tsx
 *
 * Component to display and manage tasks for a given project.
 * Features:
 * - Shows tasks grouped by status: Pending, In Progress, Completed
 * - Supports adding, updating status, and deleting tasks
 * - Displays skeleton on initial fetch
 * - Shows inline notifications for task operations
 * - Shows loading overlay during task actions (add/update/delete)
 */

import { Grid, Column, Tile, Button, InlineNotification } from "@carbon/react";
import { useMemo, useCallback, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { TaskColumn } from "../TaskColumn/TaskColumn";
import { useTasks } from "../../hooks/useTasks";
import { TaskBoardSkeleton } from "../TaskBoardSkeleton/TaskBoardSkeleton";
import { Add } from "@carbon/icons-react";
import { AddTaskModal } from "../modal/AddTaskModal";
import { LoadingOverlay } from "../common/LoadingOverlay";
import "./TaskBoard.scss";

interface Props {
  /** ID of the current project */
  projectId: string;

  /** Name of the current project (displayed in header) */
  projectName: string;
}

export const TaskBoard = ({ projectId, projectName }: Props) => {
  // ------------------------------
  // Custom hook for tasks management
  // ------------------------------
  const {
    tasks,
    loading,          // True while a task operation (add/update/delete) is in progress
    loadingSkeleton,   // True while the initial fetch of tasks is in progress
    hasFetched,        // True after first fetch completes to prevent empty flicker
    updateStatus,
    removeTask,
    addTask,
    showNotification,
    notificationKind,
    notificationTitle
  } = useTasks(projectId);

  // ------------------------------
  // Local component state
  // ------------------------------
  const [openModal, setOpenModal] = useState(false); // Modal visibility state

  // Derived state: whether there is any task data to display
  const hasData = tasks.length > 0;

  // ------------------------------
  // Memoized grouping of tasks by status
  // ------------------------------
  const groupedTasks = useMemo<Record<TaskStatus, Task[]>>(() => ({
    pending: tasks.filter(t => t.status === "pending"),
    "in-progress": tasks.filter(t => t.status === "in-progress"),
    completed: tasks.filter(t => t.status === "completed")
  }), [tasks]);

  // ------------------------------
  // Callbacks for task actions
  // ------------------------------

  /** Updates the status of a task */
  const handleStatusChange = useCallback(
    (taskId: string, status: TaskStatus) => {
      updateStatus(taskId, status);
    },
    [updateStatus]
  );

  /** Deletes a task */
  const handleDelete = useCallback(
    (taskId: string) => {
      removeTask(taskId);
    },
    [removeTask]
  );

  /** Adds a task: closes modal immediately, shows overlay during add */
  const handleAddTask = async (title: string) => {
    setOpenModal(false); // Close modal immediately
    await addTask(title); // Show overlay while adding
  };

  // ------------------------------
  // Show skeleton while first fetch is in progress
  // ------------------------------
  if (!hasFetched) {
    return <TaskBoardSkeleton />;
  }

  return (
    <>
      {/* ------------------------------
          Notification: show success/error messages for task actions
          ------------------------------ */}
      {showNotification && (
        <div className="notification margin-dashboard">
          <InlineNotification
            lowContrast
            title={notificationTitle}
            kind={notificationKind}
            style={{ marginBottom: '2rem' }}
          />
        </div>
      )}

      {/* ------------------------------
          Task board header section
          ------------------------------ */}
      <div>
        {/* Main header */}
        <Tile><h3>Task Board</h3></Tile>

        {/* Project name + Create Task button */}
        <Tile className="taskboard-header">
          <div>
            <h4> Project: {projectName}</h4>
          </div>
          <div>
            <Button
              renderIcon={Add}
              onClick={() => setOpenModal(true)}
            >
              Create Task
            </Button>
          </div>
        </Tile>
      </div>

      {/* ------------------------------
          Task columns grouped by status
          ------------------------------ */}
      {!hasData ? (
        // Empty state when no tasks exist
        <p style={{ padding: "1rem" }}>No tasks for this project.</p>
      ) : (
        <Grid fullWidth style={{ padding: 0, marginTop: '1rem', overflow: "auto" }}>
          {/* Pending tasks */}
          <Column lg={6} md={4} sm={6}>
            <TaskColumn
              title="PENDING"
              tasks={groupedTasks.pending}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </Column>

          {/* In-progress tasks */}
          <Column lg={5} md={4} sm={6}>
            <TaskColumn
              title="IN PROGRESS"
              tasks={groupedTasks["in-progress"]}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </Column>

          {/* Completed tasks */}
          <Column lg={5} md={4} sm={6}>
            <TaskColumn
              title="COMPLETED"
              tasks={groupedTasks.completed}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </Column>
        </Grid>
      )}

      {/* ------------------------------
          Add Task Modal
          ------------------------------ */}
      <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddTask}
      />

      {/* ------------------------------
          Loading overlay for task actions (add/update/delete)
          ------------------------------ */}
      <LoadingOverlay loading={loading} text="Processing task..." />
    </>
  );
};
