// Get html elements

const getElement = (selector) => {
  return document.querySelector(selector);
};

const createElement = (element) => {
  return document.createElement(element);
};

const addForm = getElement("#addForm");
const taskList = getElement(".wrapper");
const taskInput = getElement(".formInput");
const successMessage = getElement(".successfully");

let tasks = [];

const viewInputValidationResult = (isEmpty) => {
  successMessage.innerText = isEmpty
    ? "Enter something!"
    : "Task added successfully";

  successMessage.style.opacity = 1;
  successMessage.style.color = isEmpty ? "#fd1d1d" : "rgb(248 250 252)";

  setTimeout(() => (successMessage.style.opacity = 0), 2000);
};

const addTask = (event) => {
  event.preventDefault();

  const task = taskInput.value;

  viewInputValidationResult(task === "");

  if (task !== "") {
    tasks.push({ text: task, isDone: false });
    taskInput.value = "";
    renderTasks();
  }
};

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach(({ text, isDone }) => {
    const taskItem = document.createElement("div");
    

    taskItem.classList.add("task");

    const taskText = createElement("p");
    taskItem.classList.add("item-text", isDone ? "task-done" : "task-process");
    taskText.textContent = text;

    const taskButtons = createElement("div");
    taskButtons.classList.add("actionsBtn")
    taskItem.classList.add("buttons");

    const editButton = createElement("button");
    editButton.classList.add("btn", "edit", "fa-regular", "fa-pen-to-square");
    editButton.textContent = "";

    const doneButton = createElement("button");
    doneButton.classList.add("btn", "done", "fa-regular", "fa-circle-check");
    doneButton.textContent = "";

    const deleteButton = createElement("button");
    deleteButton.classList.add("btn", "delete", "fa-regular", "fa-trash-can");
    deleteButton.textContent = "";

    taskButtons.appendChild(doneButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskButtons);

    taskList.appendChild(taskItem);
  });
};

const buttonsEvents = (event) => {
  const element = tasks.find(
    (task) =>
      task.text === event.target.parentNode.previousElementSibling.textContent
  );

  const index = tasks.indexOf(element);

  const eventClassList = event.target.classList;

  if (eventClassList.contains("delete")) {
    tasks.splice(index, 1);
    renderTasks();
  }

  if (eventClassList.contains("edit")) {
    const newValue = prompt("Enter new value", "");

    tasks[index].text = newValue;
    renderTasks();
  }

  if (eventClassList.contains("done")) {
    tasks[index].isDone = true;
    renderTasks();
  }
};

addForm.addEventListener("submit", addTask);
taskList.addEventListener("click", buttonsEvents);
