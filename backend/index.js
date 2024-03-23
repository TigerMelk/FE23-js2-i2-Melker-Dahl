import express from "express";
import * as db from "./src/handledatabase.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// Gets all tasks and individuell task if task.id is refrenced
app.get("/api/tasks/:id?", (req, res) => {
  console.log("get req recieved");
  if (req.params.id) {
    db.getTask(req.params.id).then((task) => {
      if (task) res.json(task);
      else {
        res.status(404);
        res.json({ message: "task not found" });
      }
    });
  } else {
    db.getTasks().then((tasks) => res.json(tasks));
  }
});
// Posts a new task to the database using the information from the request.
app.post("/api/tasks", (req, res) => {
  db.addTask(req.body).then((newTask) => res.send(newTask));
  console.log("post req recieved");
});
// Patches the requested task, moving it from 'todo' to 'inProgress' or 'done' arrays
// setting the assigned value to what was retrieved from the request
app.patch("/api/tasks/:id", (req, res) => {
  console.log("patch req recieved");
  const taskId = req.params.id;
  const { assigned } = req.body;

  db.updateTask(taskId, assigned).then((updatedTask) => res.json(updatedTask));
});
// finds the task to delete  and removes it from the tasks array in the database
app.delete("/api/tasks/:id", (req, res) => {
  console.log("delete req recieved");
  const taskId = req.params.id;
  db.deleteTask(taskId).then((deletedTask) => res.json(deletedTask));
});
app.listen(3000, () => {
  console.log("listening to port 3000");
});
