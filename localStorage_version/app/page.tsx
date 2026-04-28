"use client";

import TaskFilters from "../components/TaskFilters";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

export default function Home() {
  const { tasks, filteredTasks, filter, setFilter, addTask, toggleTask, deleteTask } = useTasks();

  const completedCount = tasks.filter((task) => task.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 px-4 py-8 text-zinc-900 dark:from-zinc-950 dark:to-black dark:text-zinc-100 sm:py-12">
      <main className="mx-auto w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/80">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Gestionnaire de tâches</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {completedCount} tâche(s) terminée(s) sur {tasks.length}
          </p>
        </header>

        <section className="space-y-5">
          <TaskInput onAddTask={addTask} />
          <TaskFilters currentFilter={filter} onChangeFilter={setFilter} />
          <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </section>
      </main>
    </div>
  );
}
