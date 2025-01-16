// import jsonServer from "json-server";
// import path from "path";

// import { Task } from "./types/task";

// // Create server instance
// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "db.json")); // Mock database
// const middlewares = jsonServer.defaults();

// // Middleware setup
// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// // Custom endpoint for reordering tasks
// server.post("/tasks/reorder", (req: any, res: any) => {
//   const { status, tasks: reorderedTasks } = req.body;

//   if (!status || !reorderedTasks) {
//     return res.status(400).json({ error: "Invalid request payload" });
//   }

//   // Get all tasks from the database
//   const tasks: Task[] = router.db.get("tasks").value();

//   // Update the tasks with their new order
//   reorderedTasks.forEach((updatedTask: Task) => {
//     const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
//     if (taskIndex > -1) {
//       tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
//     }
//   });

//   // Save the updated tasks back to the database
//   router.db.set("tasks", tasks).write();

//   // Respond with the updated tasks in the requested column
//   const updatedTasks = tasks
//     .filter((task) => task.status === status)
//     .sort((a, b) => a.order - b.order);

//   res.status(200).json(updatedTasks);
// });

// // Use default routes provided by json-server
// server.use(router);

// const PORT = 3081;
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on http://localhost:${PORT}`);
// });
