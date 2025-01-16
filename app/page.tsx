import { Metadata } from "next";

import TaskDashboard from "@/components/containers/tasks/task-dashboard";

export const metadata: Metadata = { title: "Dashboard | Taskmate" };

export default function Home() {
  return <TaskDashboard />;
}
