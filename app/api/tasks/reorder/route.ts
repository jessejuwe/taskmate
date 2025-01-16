import fs from "fs";
import path from "path";
import { Task } from "@/types/task.types";

const dbPath = path.join(process.cwd(), "db.json"); // Path to db.json

const readDb = (): { tasks: Task[] } => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeDb = (data: { tasks: Task[] }) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

export async function POST(req: Request): Promise<Response> {
  const { status, tasks: reorderedTasks }: { status: string; tasks: Task[] } =
    await req.json();

  if (!status || !reorderedTasks) {
    return new Response(JSON.stringify({ error: "Invalid request payload" }), {
      status: 400,
    });
  }

  try {
    const data = readDb();

    // Update the `order` field for the provided tasks
    const tasks = reorderedTasks.map((task, index) => ({
      ...task,
      order: index, // Update the order
    }));

    // Replace the existing tasks in the database
    data.tasks = data.tasks.map(
      (existingTask) =>
        tasks.find((task) => task.id === existingTask.id) || existingTask
    );

    writeDb(data);

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to reorder tasks" }), {
      status: 500,
    });
  }
}
