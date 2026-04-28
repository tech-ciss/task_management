"use client";

import { useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter } from "../types/task";

const TASKS_STORAGE_KEY = "task-manager:tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const persistTasks = (nextTasks: Task[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Task[];
      if (Array.isArray(parsed)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(parsed);
      }
    } catch {
      
    }
  }, []);

  useEffect(() => {
    const syncTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/tasks", { method: "GET" });
        if (!response.ok) {
          throw new Error("Impossible de charger les tâches.");
        }

        const serverTasks = (await response.json()) as Task[];
        setTasks(serverTasks);
        persistTasks(serverTasks);
      } catch (syncError) {
        const message = syncError instanceof Error ? syncError.message : "Erreur inconnue.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void syncTasks();
  }, []);

  const addTask = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      setError(null);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Impossible d'ajouter la tâche.");
      }

      const createdTask = (await response.json()) as Task;
      setTasks((prev) => {
        const nextTasks = [createdTask, ...prev];
        persistTasks(nextTasks);
        return nextTasks;
      });
    } catch (addError) {
      const message = addError instanceof Error ? addError.message : "Erreur inconnue.";
      setError(message);
    }
  };

  const toggleTask = async (id: string) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const nextStatus = currentTask.status === "completed" ? "pending" : "completed";

    try {
      setError(null);
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Impossible de mettre à jour la tâche.");
      }

      const updatedTask = (await response.json()) as Task;
      setTasks((prev) => {
        const nextTasks = prev.map((task) => (task.id === updatedTask.id ? updatedTask : task));
        persistTasks(nextTasks);
        return nextTasks;
      });
    } catch (toggleError) {
      const message = toggleError instanceof Error ? toggleError.message : "Erreur inconnue.";
      setError(message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Impossible de supprimer la tâche.");
      }

      setTasks((prev) => {
        const nextTasks = prev.filter((task) => task.id !== id);
        persistTasks(nextTasks);
        return nextTasks;
      });
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Erreur inconnue.";
      setError(message);
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return {
    tasks,
    filteredTasks,
    filter,
    loading,
    error,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  };
}
