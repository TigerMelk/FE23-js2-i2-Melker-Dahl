import fs from "fs/promises";

async function readDatabase() {
  const rawDb = await fs.readFile("./src/db.json");
  return JSON.parse(rawDb);
}
async function writeDatabase(tasks) {
  const db = { tasks };
  const done = await fs.writeFile("./src/db.json", JSON.stringify(db, null, 2));
  return done;
}
async function getTasks() {
  const db = await readDatabase();
  const { tasks } = db;
  return tasks;
}
async function getTask(id) {
  const tasks = await getTasks();
  for (const status of ["todo", "inProgress", "done"]) {
    const task = tasks[0][status].find((task) => task.id == id);
    if (task) return task;
  }
  return { message: "task not found" };
}
async function addTask(task) {
  const newTask = { id: crypto.randomUUID(), ...task };
  if (!newTask.hasOwnProperty("assigned")) {
    newTask.assigned = "";
  }
  if (!newTask.hasOwnProperty("status")) {
    newTask.status = "todo";
  }
  const tasks = await getTasks();
  tasks[0].todo.push(newTask);
  await writeDatabase(tasks);
  return newTask;
}
async function updateTask(taskId, assigned) {
  const tasks = await getTasks();
  const taskList = tasks[0];
  let taskIndex = taskList.todo.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    taskIndex = taskList.inProgress.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return { message: "task not found in updateTask" };
    }
    taskList.inProgress[taskIndex].status = "done";
    const movedTask = taskList.inProgress.splice(taskIndex, 1)[0];
    taskList.done.push(movedTask);
  } else {
    taskList.todo[taskIndex].assigned = assigned;
    taskList.todo[taskIndex].status = "inProgress";

    const movedTask = taskList.todo.splice(taskIndex, 1)[0];
    taskList.inProgress.push(movedTask);
  }

  await writeDatabase(tasks);
  return taskList;
}
async function deleteTask(taskId) {
  const tasks = await getTasks();
  const taskList = tasks[0];
  const taskIndex = taskList.done.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return { message: "task not found in deleteTask" };
  }
  taskList.done.splice(taskIndex, 1)[0];
  await writeDatabase(tasks);
  return taskList;
}
export {
  readDatabase,
  writeDatabase,
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
