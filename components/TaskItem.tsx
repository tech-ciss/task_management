"use client";

import type { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggleTask: (id: string) => void | Promise<void>;
  onDeleteTask: (id: string) => void | Promise<void>;
};

export default function TaskItem({ task, onToggleTask, onDeleteTask }: TaskItemProps) {
  const isCompleted = task.status === "completed";
  const statusLabel = isCompleted ? "terminée" : "en cours";

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:scale-[1.01] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      
      <div className="min-w-0 flex-1">
        <p className={`truncate text-base font-medium ${
          isCompleted ? "text-zinc-500 line-through dark:text-zinc-400" : "text-zinc-900 dark:text-zinc-100"
        }`}>
          {task.text}
        </p>
        <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => onToggleTask(task.id)}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 bg-zinc-100 text-zinc-800 transition duration-200 hover:bg-zinc-200 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          {isCompleted ? "Relancer" : "Terminer"}
        </button>
        
        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-red-300 bg-red-50 text-red-700 transition duration-200 hover:bg-red-100 active:scale-[0.98] dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}