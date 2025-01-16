import fs from "fs";
import path from "path";
import { Task } from "@/types/task.types";

const dbPath = path.join(process.cwd(), "db.json"); // Path to db.json

const readDb = (): { tasks: Task[] } => {
  const data = fs.readFileSync(dbPath, "utf8");
  console.log(data);
  return JSON.parse(data);
};

const writeDb = (data: { tasks: Task[] }) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  try {
    const tasks = readDb().tasks;
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch task" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const updates: Partial<Task> = await req.json();

  try {
    const data = readDb();
    const taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    // Update task fields and save
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(), // Server generates `updatedAt`
    };

    writeDb(data); // Save changes back to db.json

    return new Response(JSON.stringify(data.tasks[taskIndex]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update task" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    const data = readDb();
    const taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (!taskIndex) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    data.tasks.splice(taskIndex, 1);
    writeDb(data); // Save changes back to db.json

    return new Response(
      JSON.stringify({ message: `Task ${id} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
    });
  }
}
