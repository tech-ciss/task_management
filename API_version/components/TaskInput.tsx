"use client";

import { FormEvent, useState } from "react";

type TaskInputProps = {
  onAddTask: (text: string) => void | Promise<void>;
};

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Ajouter une tâche..."
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
      />
      <button
        type="submit"
        className="rounded-xl bg-zinc-900 px-5 py-3 font-medium text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Ajouter
      </button>
    </form>
  );
}
