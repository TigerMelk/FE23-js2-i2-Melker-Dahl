import { getTasks, postTask, patchTask, deleteTask } from "./modules/fetch.js";
import { displayTasks } from "./modules/display.js";
getTasks().then((tasks) => {
  displayTasks(tasks);
});
// Gets the form for adding a new task and
// uses a post request to update the server database,
// then retrieves the information to show the tasks
const form = document.getElementById("newTaskForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskInput = document.getElementById("newTask");
  const task = taskInput.value;
  const category = document.getElementById("category").value;
  const taskData = {
    task: task,
    category: category,
  };
  postTask(taskData)
    .then(() => getTasks())
    .then((tasks) => {
      displayTasks(tasks);
    });
  taskInput.value = "";
});
// Gets the forms/ or tasks/ in the sections,
// adds eventlisteners to each
// and sends patchrequests depending on what was submitted
// then updates the tasks with the changes made
const mainContainer = document.getElementById("mainContainer");
mainContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const submittedForm = event.target;
  const taskSection = submittedForm.closest("section");
  if (taskSection) {
    const status = taskSection.id;
    const taskId = submittedForm.id;

    switch (status) {
      case "todo":
        const assignedInput = submittedForm.querySelector("input[type='text']");
        assignedInput.setAttribute("required", "");
        const assigned = assignedInput.value;
        if (assigned !== "") {
          const assignedData = {
            assigned: assigned,
          };
          patchTask(taskId, assignedData)
            .then(() => getTasks())
            .then((tasks) => {
              displayTasks(tasks);
            });
        }
        break;
      case "inProgress":
        patchTask(taskId)
          .then(() => getTasks())
          .then((tasks) => {
            displayTasks(tasks);
          });
        break;
      case "done":
        deleteTask(taskId)
          .then(() => getTasks())
          .then((tasks) => {
            displayTasks(tasks);
          });
        break;
      default:
        console.error("task no status");
    }
  }
});
