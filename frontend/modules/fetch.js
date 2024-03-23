// fetch functions for get, post, patch and delete requests
async function getTasks(id) {
  const path = id ? id : "";
  return await fetchShortcut(path, "GET");
}
async function postTask(taskData) {
  return await fetchShortcut("", "Post", taskData);
}
async function patchTask(taskId, taskData) {
  return await fetchShortcut(taskId, "PATCH", taskData);
}
async function deleteTask(taskId) {
  return await fetchShortcut(taskId, "DELETE");
}

async function fetchShortcut(path, method, data = null) {
  let url = `http://localhost:3000/api/tasks/${path}`;
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    return { error: `Failed to fetch ${method} request` };
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export { getTasks, postTask, patchTask, deleteTask };
