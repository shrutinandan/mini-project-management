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


  return { tasks, loading, updateStatus: updateStatusTask, addTask, removeTask, loadTasks, showNotification, notificationKind, notificationTitle };
};

