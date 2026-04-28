"use client";

import type { TaskFilter } from "../types/task";

type TaskFiltersProps = {
  currentFilter: TaskFilter;
  onChangeFilter: (filter: TaskFilter) => void;
};

const FILTERS: { label: string; value: TaskFilter }[] = [
  { label: "Toutes", value: "all" },
  { label: "Terminées", value: "completed" },
  { label: "En cours", value: "pending" },
];

export default function TaskFilters({ currentFilter, onChangeFilter }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChangeFilter(filter.value)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
