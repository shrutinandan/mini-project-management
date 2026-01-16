import { Grid, Column, Tile, Button, InlineNotification } from "@carbon/react";
import { useMemo, useCallback, useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { TaskColumn } from "../TaskColumn/TaskColumn";
import { useTasks } from "../../hooks/useTasks";
import { TaskBoardSkeleton } from "../TaskBoardSkeleton/TaskBoardSkeleton";
import { Add } from "@carbon/icons-react";
import { CreateProjectModal } from "../modal/CreateProjectModal";
import { AddTaskModal } from "../modal/AddTaskModal";
import { CircleLoader } from 'react-spinners';

interface Props {
  projectId: string;
  projectName: string
}

export const TaskBoard = ({ projectId, projectName }: Props) => {
  console.log('projectId', projectId, projectName)
  const { tasks, loading, updateStatus, removeTask, addTask, showNotification, notificationKind, notificationTitle } = useTasks(projectId);
  console.log('tasks in taskboard', tasks)
  const[openModal, setOpenModal] = useState(false);


  // 🔒 Prevent empty flicker
  const hasData = tasks.length > 0;

  useEffect(() => {
  console.log("TaskBoard mounted", projectId);
  return () => console.log("TaskBoard unmounted");
}, []);


  const groupedTasks = useMemo<Record<TaskStatus, Task[]>>(() => ({
    pending: tasks.filter(t => t.status === "pending"),
    "in-progress": tasks.filter(t => t.status === "in-progress"),
    completed: tasks.filter(t => t.status === "completed")
  }), [tasks]);

  const handleStatusChange = useCallback(
    (taskId: string, status: TaskStatus) => {
      updateStatus(taskId, status);
    },
    [updateStatus]
  );

  const handleDelete = useCallback(
    (taskId: string) => {
      removeTask(taskId);
    },
    [removeTask]
  );

  // ✅ Skeleton FIRST
  if (loading) {
    return <TaskBoardSkeleton />;
  }

  // ✅ No tasks AFTER load
  if (!hasData) {
    return <p style={{ padding: "1rem" }}>No tasks for this project.</p>;
  }

  return (
    <>
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
    <div >
     <Tile >      <h3>Task Board</h3></Tile>
      <Tile style={{display:'flex', justifyContent: 'space-between'}}>
    
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
    
    
    <Grid fullWidth style={{padding: 0, marginTop: '1rem', overflow: "auto"}}>
     
      <Column lg={6} md={4} sm={6}>
        <TaskColumn
          title="PENDING"
          tasks={groupedTasks.pending}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </Column>

      <Column lg={5} md={4} sm={6}>
        <TaskColumn
          title="IN PROGRESS"
          tasks={groupedTasks["in-progress"]}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </Column>

      <Column lg={5} md={4} sm={6}>
        <TaskColumn
          title="COMPLETED"
          tasks={groupedTasks.completed}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </Column>
    </Grid>
     <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={addTask}
      />
    
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <CircleLoader
              color={'#0f62fe'}
              loading={true}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <span>Loading...</span>
          </div>
        </div>
      )}

    </>

    
  );
};
