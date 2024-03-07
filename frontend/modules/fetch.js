async function getTasks(id) {
  let url = "http://localhost:3000/api/tasks";
  if (id) {
    url += `${id}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    return { error: "failed to fetch" };
  }
  const tasks = await response.json();
  return tasks;
}
async function postTask(taskData) {
  const url = "http://localhost:3000/api/tasks";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    return { error: "failed to fetch" };
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
async function patchTask(taskToChange, taskData) {
  const url = `http://localhost:3000/api/tasks/${taskToChange}`;
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    return { error: "Failed to fetch" };
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
async function deleteTask(taskId) {
  const url = `http://localhost:3000/api/tasks/${taskId}`;
  const options = {
    method: "DELETE",
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    return { error: "Failed to fetch deleteTask" };
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
export { getTasks, postTask, patchTask, deleteTask };
