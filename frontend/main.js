import { getTasks, postTask, patchTask, deleteTask } from "./modules/fetch.js";
import { displayTasks } from "./modules/display.js";
getTasks().then((tasks) => {
  setTimeout(() => {
    displayTasks(tasks);
  }, 100);
});

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
      setTimeout(() => {
        displayTasks(tasks);
      }, 100);
    });
  taskInput.value = "";
});

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
        const assigned =
          submittedForm.querySelector("input[type='text']").value;
        const assignedData = {
          assigned: assigned,
        };
        patchTask(taskId, assignedData)
          .then(() => getTasks())
          .then((tasks) => {
            setTimeout(() => {
              displayTasks(tasks);
            }, 100);
          });

        break;
      case "inProgress":
        patchTask(taskId)
          .then(() => getTasks())
          .then((tasks) => {
            setTimeout(() => {
              displayTasks(tasks);
            }, 100);
          });
        break;
      case "done":
        deleteTask(taskId)
          .then(() => getTasks())
          .then((tasks) => {
            setTimeout(() => {
              displayTasks(tasks);
            }, 100);
          });
        break;
      default:
        console.error("task no status");
    }
  }
});
