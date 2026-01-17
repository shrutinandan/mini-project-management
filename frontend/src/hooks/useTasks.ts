import { useState, useEffect, useCallback } from "react";

import { fetchTasksByProjectId, updateTaskStatus, createTask, deleteTask } from "../services/task.api";
import { delay } from "../utils/delay";
import type { Task, TaskStatus } from "../types/tasks";
import type { NotificationKind } from "../types";


export const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [notificationTitle, setNotificationTitle] = useState(
    "Server is not reachable"
  );
  const [notificationKind, setNotificationKind] = useState<NotificationKind>("info");
  // Load tasks
  const loadTasks = useCallback(async () => {

    // this delay have been added just for dev env
    if (import.meta.env.VITE_ENVNAME === 'DEV') {
      await delay(500);
    }
    setLoadingSkeleton(true);
    try {
      const data = await fetchTasksByProjectId(projectId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSkeleton(false);
      setHasFetched(true); // ✅ important
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
      setShowNotification(true);
      setNotificationKind("error");
      setNotificationTitle(
        err instanceof Error
          ? err.message
          : "Failed to update task"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Add task
  const addTask = async (title: string) => {
    setLoading(true);

      // this delay have been added just for dev env
        if (import.meta.env.VITE_ENVNAME === 'DEV') {
          await delay(500);
        }
    try {
      const newTask = await createTask(projectId, title);
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


  return { tasks, loading, loadingSkeleton, hasFetched, updateStatus: updateStatusTask, addTask, removeTask, loadTasks, showNotification, notificationKind, notificationTitle };
};

