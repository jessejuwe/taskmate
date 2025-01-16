import { Task } from "@/types/task.types";

const API_URL = "/api";
// const API_URL = "http://localhost:3081";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export const addTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task), // Only send minimal data
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json(); // Server handles task creation
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const reorderTasks = async (
  status: string, // The column status (e.g., "todo", "in-progress")
  reorderedTasks: Task[]
): Promise<Task[]> => {
  // Prepare the reordered tasks payload (with their new "order" values)
  const reorderedPayload = reorderedTasks.map((task, index) => ({
    id: task.id,
    order: index, // Use the array index as the new "order"
    status: task.status,
  }));

  const response = await fetch(`${API_URL}/tasks/reorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status, // The status of the column being reordered
      tasks: reorderedPayload, // Send the reordered list to the backend
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to reorder tasks");
  }

  // Parse and return the updated tasks
  const updatedTasks: Task[] = await response.json();

  // Ensure the returned tasks are sorted by their "order" field
  return updatedTasks.sort((a: Task, b: Task) => a.order - b.order);
};
