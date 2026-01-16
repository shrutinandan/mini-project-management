// import { useEffect, useState, useRef, useCallback } from "react";
// import type { Task, TaskStatus } from "../types";
// import {
//   createTask,
//   updateTaskStatus,
//   deleteTask,
//   fetchTasksByProjectId
// } from "../services/task.api";

// export const useTasks = (projectId: string) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔒 Prevent duplicate fetch in StrictMode
//   const fetchedRef = useRef<string | null>(null);

//   useEffect(() => {
//     if (!projectId) return;

//     // ⛔ Already fetched for this project
//     if (fetchedRef.current === projectId) return;

//     fetchedRef.current = projectId;
//     setLoading(true);

//     fetchTasksByProjectId(projectId)
//       .then((response) => {
//         console.log("API response", response);
//         setTasks(response);
//       })
//       .catch(err => {
//         console.error("Failed to load tasks", err);
//       })
//       .finally(() => setLoading(false));

//   }, [projectId]);

//   // 🔹 Mutations
// const addTask = useCallback(async (title: string) => {
//   if (!projectId) return;

//   console.log("projectId in add", projectId);

//   await createTask(projectId, title);

//   // ✅ Re-fetch tasks after success
//   await fetchTasksByProjectId(projectId);
// }, [projectId, fetchTasksByProjectId]);


// const updateStatus = useCallback(
//   async (taskId: string, status: TaskStatus) => {
//     try {
//       // Call API to update task
//       const updatedTask = await updateTaskStatus(taskId, status);

//       // Merge the updated task into local state
//       setTasks(prevTasks =>
//         prevTasks.map(t => (t.id === taskId ? updatedTask : t))
//       );

//       // ✅ This automatically updates the UI/board
//     } catch (error) {
//       console.error("Failed to update task:", error);
//     }
//   },
//   []
// );


//   const removeTask = useCallback(async (taskId: string) => {
//     await deleteTask(taskId);
//     setTasks(prev => prev.filter(t => t.id !== taskId));
//   }, []);
// console.log('tasks in usestate', tasks)
//   return {
//     tasks,
//     loading,
//     addTask,
//     updateStatus,
//     removeTask
//   };
// };
import { useState, useEffect, useCallback } from "react";
import type { Task, TaskStatus } from "../types";
import { fetchTasksByProjectId, updateTaskStatus, createTask , deleteTask } from "../services/task.api";

type NotificationKind = "error" | "info" | "info-square" | "success" | "warning" | "warning-alt" | undefined

export const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState(
      "Server is not reachable"
    );
  const [notificationKind, setNotificationKind] = useState<NotificationKind>("info");
  // Load tasks
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTasksByProjectId(projectId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Update status
  const updateStatusTask = useCallback(async (taskId: string, status: TaskStatus) => {
    setLoading(true);
    try {
      const updated = await updateTaskStatus(taskId, status);
      setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add task
const addTask = async (title: string) => {
  setLoading(true);
  try {
    const newTask = await createTask(projectId, title);
    console.log('newTask', newTask)
    setTasks(prev => [...prev, newTask.data]);
     setShowNotification(true);
      setNotificationKind("success");
      setNotificationTitle(newTask.message)
  } catch (err: any) {
       setShowNotification(true);
       setNotificationKind("error");
      setNotificationTitle("Failed to create task")
  } finally {
    setLoading(false);
  }
};


  // Remove task
const removeTask = async (taskId: string) => {
  try {
    setLoading(true);

    const res = await deleteTask(taskId);
    console.log('res', res)

    setTasks(prev => prev.filter(t => t.id !== res.id));
    setShowNotification(true);
    setNotificationKind("success");
    setNotificationTitle(res.message)
  } catch (err: any) {
    setShowNotification(true);
    setNotificationKind("error");
    setNotificationTitle("Failed to Delete task")
  } finally {
    setLoading(false);
  }
};


  return { tasks, loading, updateStatus: updateStatusTask, addTask, removeTask, loadTasks, showNotification, notificationKind, notificationTitle };
};

