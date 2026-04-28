export type TaskStatus = "pending" | "completed";

export type Task = {
  id: string;
  text: string;
  status: TaskStatus;
};

export type TaskFilter = "all" | "completed" | "pending";
