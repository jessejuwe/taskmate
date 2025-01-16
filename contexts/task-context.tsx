"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

import { toaster } from "@/components/ui/toaster";
import { addTask as addTaskToDb } from "@/lib/tasks";
import { deleteTask as deleteTaskToDb } from "@/lib/tasks";
import { reorderTasks as reorderTasksInDb } from "@/lib/tasks";
import { updateTask as updateTaskInDb } from "@/lib/tasks";
import { Task, TaskStatus } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  loadTasks: (tasks: Task[]) => void;
  removeTask: (id: string) => void;
  reorderTasks: (status: TaskStatus, reorderedTasks: Task[]) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (task: Task) => {
    try {
      if (process.env.NODE_ENV === "production") {
        setTasks([task, ...tasks]);
      } else {
        const newTask = await addTaskToDb(task);
        setTasks([newTask, ...tasks]);
      }

      toaster.success({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      console.log(error);
      toaster.error({
        title: "Error",
        description: "Failed to create task. Please try again.",
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      if (process.env.NODE_ENV === "development") {
        await updateTaskInDb(id, updates);
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );

      toaster.success({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Error",
        description: "Failed to update task. Please try again.",
      });
    }
  };

  // const updateStatus = async (id: string, updates: Partial<Task>) => {
  //   try {
  //     // Send the update to the backend
  //     const updatedTask = await updateTaskInDb(id, updates);

  //     // Update the local state
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === id ? { ...task, ...updatedTask } : task
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Failed to update task status:", error);
  //   }
  // };

  const updateStatus = async (id: string, status: TaskStatus) => {
    try {
      if (process.env.NODE_ENV === "development") {
        await updateTaskInDb(id, { status });
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
      );

      toaster.success({
        title: "Success",
        description: "Task status updated",
      });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: "Failed to update task status. Please try again.",
      });
    }
  };

  const removeTask = async (id: string) => {
    try {
      if (process.env.NODE_ENV === "development") {
        await deleteTaskToDb(id);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      toaster.success({
        title: "Success",
        description: "Task removed successfully",
      });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: "Failed to remove task. Please try again.",
      });
    }
  };

  const reorderTasks = async (status: TaskStatus, reorderedTasks: Task[]) => {
    try {
      // Send the reordered list to the backend
      const updatedTasks = await reorderTasksInDb(status, reorderedTasks);

      // Update the local state
      setTasks(
        (prevTasks) =>
          prevTasks
            .filter((task) => task.status !== status) // Remove tasks in the column
            .concat(updatedTasks) // Add updated, reordered tasks
      );

      toaster.success({
        title: "Success",
        description: "Tasks reordered successfully",
      });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: "Failed to reorder tasks. Please try again.",
      });
    }
  };

  const loadTasks = (tasks: Task[]) => {
    setTasks(tasks);
  };

  const value = {
    tasks,
    addTask,
    loadTasks,
    removeTask,
    reorderTasks,
    updateStatus,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
