"use client";

import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./task-card";
import { Task, TaskStatus } from "@/types/task.types";

interface TaskListProps {
  tasks: Task[];
  status: TaskStatus;
}

export default function TaskList({ tasks, status }: TaskListProps) {
  const { setNodeRef } = useDroppable({ id: status });

  // Sort tasks by "order" before rendering
  const sortedTasks = tasks.sort((a, b) => a.order - b.order);

  return (
    <div ref={setNodeRef} className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <div className="text-center p-4 text-muted-foreground">
          No tasks in this column
        </div>
      )}
    </div>
  );
}
