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
app.get("/api/tasks/:id?", async (req, res) => {
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

app.post("/api/tasks", async (req, res) => {
  db.addTask(req.body).then((newTask) => res.send(newTask));
  console.log("post req recieved");
});
app.patch("/api/tasks/:id", async (req, res) => {
  console.log("patch req recieved");
  const taskId = req.params.id;
  console.log(req.body, typeof req.body);
  const { assigned } = req.body;
  const updatedTasks = await db.updateTask(taskId, assigned);
  res.json(updatedTasks);
});
app.delete("/api/tasks/:id", async (req, res) => {
  console.log("delete req recieved");
  const taskId = req.params.id;
  const deleteTasks = await db.deleteTask(taskId);
  res.json(deleteTasks);
});
app.listen(3000, () => {
  console.log("listening to port 3000");
});
