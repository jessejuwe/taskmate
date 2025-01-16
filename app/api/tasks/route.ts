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
  try {
    const taskData: Omit<Task, "id" | "createdAt" | "updatedAt"> = await req.json(); // prettier-ignore

    // Validate input
    if (!taskData.title || !taskData.description || !taskData.status) {
      return new Response(JSON.stringify({ error: "Invalid task data" }), {
        status: 400,
      });
    }

    const data = readDb();

    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substring(7), // Generate a unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.tasks.push(newTask); // Add the new task
    writeDb(data); // Save the updated tasks to db.json

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}

export async function GET(): Promise<Response> {
  try {
    const tasks = readDb().tasks; // Access tasks array from db.json
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}
