"use strict";

// SELECTORS
const todoInput = document.querySelector(".form-input");
const todoBtn = document.querySelector(".form-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
eventListeners();

function eventListeners() {
  todoBtn.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteTodo);
  filterOption.addEventListener("click", filterTodo);

  // On page load, load the content from localStorage if there is any
  document.addEventListener("DOMContentLoaded", getTodos);
}

// FUNCTIONALITY
function addTodo(e) {
  // Prevents form from submitting
  e.preventDefault();
  // Todo div, create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-box");
  // Todo li, create li
  const newTodo = document.createElement("li");
  // Input value will come from here
  newTodo.innerText = todoInput.value;

  // If we try to add empty input return nothing
  if (todoInput.value === "") {
    return "";
    // else add todo
  } else {
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
  }

  // ADD TODO TO LOCAL STORAGE
  saveTodoStorage(todoInput.value);

  // Check mark button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check todo-check"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);
  // Check trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fa-solid fa-trash todo-delete"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  // NOW WE NEED TO APPEND TO THE TODO LIST IN HTML
  todoList.appendChild(todoDiv);

  // Clear input value on submit
  todoInput.value = "";
}

function deleteTodo(e) {
  // the item we are targeting
  const item = e.target;
  // if the item contains the class than delete item box
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    // falling down delete animation
    todo.classList.add("todo-fall");
    // REMOVE TODO FROM LOCAL STORAGE
    removeLocalTodos(todo);
    /* The transitionend event is fired when a CSS transition has completed. 
    In the case where a transition is removed before completion, such as if the 
    transition-property is removed or display is set to none, then the event will not be generated. */
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // if the item contains the class than toggle complete class
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("todo-completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("todo-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("todo-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// SAVE TODO IN LOCAL STORAGE
function saveTodoStorage(todo) {
  /* First we need to check if any todo is already saved in localStorage, 
  so that we don't override it*/
  let todos;
  // if there isn't return empty string
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// GET THE TODOS FROM LOCAL STORAGE
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div, create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-box");
    // Todo li, create li
    const newTodo = document.createElement("li");
    // Input value will come from here
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // POGLEDATI TACNU DEFINICIJU
    todoDiv.appendChild(newTodo);
    // Check mark button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check todo-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // Check trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fa-solid fa-trash todo-delete"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    // NOW WE NEED TO APPEND TO THE TODO LIST IN HTML
    todoList.appendChild(todoDiv);
  });
}

// REMOVE THE TODOS FROM LOCAL STORAGE
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
