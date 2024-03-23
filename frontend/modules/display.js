// Gets the sections and fills them with forms
// depending on the information retrieved from the server side.
function displayTasks(tasks) {
  const todoSection = document.getElementById("todo");
  const inProgressSection = document.getElementById("inProgress");
  const doneSection = document.getElementById("done");
  clearSection(todoSection);
  clearSection(inProgressSection);
  clearSection(doneSection);
  for (const status of ["todo", "inProgress", "done"]) {
    tasks[0][status].forEach((task) => {
      const taskEl = createTaskEl(task);
      switch (task.status) {
        case "todo":
          appendToSection(taskEl, todoSection);
          break;
        case "inProgress":
          appendToSection(taskEl, inProgressSection);
          break;
        case "done":
          appendToSection(taskEl, doneSection);
          break;
        default:
          console.error("no status found");
      }
    });
  }
}
// clears the section of either 'todo', 'inProgress' or 'done'
// to then fill it with the new information
function clearSection(section) {
  section.innerHTML = "";
}
// creates the forms depending on the status of the task
function createTaskEl(task) {
  const form = document.createElement("form");
  form.id = task.id;
  form.classList.add(task.category, "taskForm");
  const taskDescription = document.createElement("p");
  taskDescription.innerText = task.task;
  const assignName = document.createElement("p");
  form.append(taskDescription);
  form.append(assignName);
  switch (task.status) {
    case "todo":
      const assignInput = document.createElement("input");
      assignInput.type = "text";
      assignInput.placeholder = "Assign someone";
      form.append(assignInput);
      const assignBtn = document.createElement("button");
      assignBtn.type = "submit";
      assignBtn.innerText = "Assign >";
      form.append(assignBtn);
      break;
    case "inProgress":
      const doneBtn = document.createElement("button");
      doneBtn.type = "submit";
      doneBtn.innerText = "Done >";
      doneBtn.classList.add("doneBtn");
      form.append(doneBtn);
      assignName.innerText = "-" + task.assigned;
      break;
    case "done":
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "submit";
      deleteBtn.innerText = "Remove X";
      deleteBtn.classList.add("deleteBtn");
      form.append(deleteBtn);
      assignName.innerText = "-" + task.assigned;
      break;
    default:
      console.error("no status found");
  }

  return form;
}
function appendToSection(el, section) {
  section.appendChild(el);
}

export { displayTasks };
