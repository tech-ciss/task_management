import type { Task, TaskStatus } from "../types/task";

const tasks: Task[] = [];

export function getAllTasks(): Task[] {
  return [...tasks];
}

export function createTask(text: string): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    text,
    status: "pending",
  };

  tasks.unshift(task);
  return task;
}

export function updateTaskStatus(id: string, status: TaskStatus): Task | null {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    status,
  };

  return tasks[index];
}

export function deleteTaskById(id: string): boolean {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
