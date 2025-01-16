import { Task } from "@/types/task";

const API_URL = "http://localhost:3081";

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
  const newTask = {
    ...task,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
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
    body: JSON.stringify({
      ...updates,
      updatedAt: new Date().toISOString(),
    }),
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
  const updatedTasks = await response.json();

  // Ensure the returned tasks are sorted by their "order" field
  return updatedTasks.sort((a: Task, b: Task) => a.order - b.order);
};
