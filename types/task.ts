export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory = "work" | "personal" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  status: TaskStatus;
  dueDate: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
