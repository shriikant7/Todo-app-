import "../assets/css/style.css";

const app = document.getElementById("app");

app.innerHTML = `
 <div class = "todos">
  <div class = "todos-header">
    <h3 class = "todos-title"> Todo List</h3>
    <div>
      <p> You have <span class = "todos-count"> </span> items</p>
      <button class = "todos-clear" style ="display:none"> Clear Completed</button>
    </div>
  
  </div>
  <form class= "todos-form" name = "todos">
    <input type = "text" placeholder = "whats new?" name = "todo">

  </form>
  <ul class = "todos-list">
  </ul>
 </div>
  
`;

//selectors
const root = document.querySelector(".todos");
const list = root.querySelector(".todos-list");

const form = document.forms.todos;
const input = form.elements.todo;

//state management
let todos = [];

// render functionality
function renderTodos(todos) {
  let todosString = ``;
  //construct
  todos.forEach((todo, index) => {
    todosString += `
    <li id = ${index}>
    <input type = "checkbox"/>
    <span>${todo.label}</span>
    <button></button>
    </li>
    `;
  });
  list.innerHTML = todosString;
}

// add functionality
function addTodo(event) {
  event.preventDefault();
  const label = input.value.trim();
  const complete = false;
  const todo = { label, complete };
  todos = [...todos, todo];
  //console.log(todos);
  renderTodos(todos);
  input.value = "";
}
function updateTodo(event) {
  const id = Number(event.target.parentNode.getAttribute("id"));
  const complete = event.target.checked;

  todos.map((todo, index) => {
    if (id === index) {
      const updatedTodo = { ...todo, complete: complete };
      return updatedTodo;
    }
    return todo;
  });
}

//initial function
function init() {
  form.addEventListener("submit", addTodo);
  list.addEventListener("change", updateTodo);
}
init();

// Deleting Items from State

/*
import "../assets/css/style.css";

const app = document.getElementById("app");

app.innerHTML = `
  <div class="todos">
     <div class="todos-header">
       <h3 class="todos-title">Todo List</h3>
       <div>
        <p>You have <span class="todos-count"></span> items</p>
        <button class="todos-clear" style="display:none">Clear completed</button>
       </div>
     </div>

     <form class="todos-form" name="todos">
       <input type="text" placeholder="what you want to add next?" name="todo">
     </form>

     <ul class="todos-list">
     </ul>
  </div>
`;

// selector
const root = document.querySelector(".todos");
const list = root.querySelector(".todos-list");
const count = root.querySelector(".todos-count");

const form = document.forms.todos;
const input = form.elements.todo;

// state management
let todos = []; // [{ label: 1, complete: false } , { label: 2, complete: false }]

// functions

// render functinality
function renderTodos(todos) {
  // console.log(todos);
  let todosString = ``;

  // construct
  todos.forEach((todo, index) => {
    todosString += `
       <li id="${index}" ${todo.complete ? "class='todos-complete'" : ""}>
          <input type="checkbox" ${todo.complete ? "checked" : ""}>
          <span>${todo.label}</span>
          <button></button>
       </li>
     `;
  });

  //console.log(todosString);
  list.innerHTML = todosString;
  count.innerText = todos.filter((todo) => !todo.complete).length;
}

// create/ add functionality
function addTodo(event) {
  event.preventDefault();
  const label = input.value.trim();
  const complete = false;

  const todo = { label, complete };
  todos = [...todos, todo];
  //  console.log(todos);
  renderTodos(todos);
  input.value = "";
}

// updateTodo
function updateTodo(event) {
  console.log(event.target);
  const id = Number(event.target.parentNode.getAttribute("id")); // 1
  const complete = event.target.checked; // true

  todos = todos.map((todo, index) => {
    if (id === index) {
      const updatedTodo = { ...todo, complete: complete };
      return updatedTodo;
    }
    return todo;
  });

  console.log(todos);
  renderTodos(todos);
}

function deleteTodo(event) {
  console.log(event.target.nodeName);
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  const id = Number(event.target.parentNode.getAttribute("id")); // 1
  todos = todos.filter((item, index) => index !== id);

  console.log(todos);
  renderTodos(todos);
}

// init
function initi() {
  // add functinality
  form.addEventListener("submit", addTodo);

  // update functinality
  list.addEventListener("change", updateTodo);

  // delete functinality

  list.addEventListener("click", deleteTodo);
}

initi();
*/

// 2) Clear functinality , Toggling UI State and Filtering Collections
// 3) browser State to LocalStorage
// 4) Dynamic DOM Injection for Editing functinality

/*
  or operator ---> this will return fist truthy expression , in case first expression is falsy the second one will be returned
*/

/*
import "../assets/css/style.css";

const app = document.getElementById("app");

app.innerHTML = `
  <div class="todos">
     <div class="todos-header">
       <h3 class="todos-title">Todo List</h3>
       <div>
        <p>You have <span class="todos-count"></span> items</p>
        <button class="todos-clear" style="display:none">Clear completed</button>
       </div>
     </div>

     <form class="todos-form" name="todos">
       <input type="text" placeholder="what you want to add next?" name="todo">
     </form>

     <ul class="todos-list">
     </ul>
  </div>
`;

// selector
const root = document.querySelector(".todos");
const list = root.querySelector(".todos-list");
const count = root.querySelector(".todos-count");
const clear = root.querySelector(".todos-clear");

const form = document.forms.todos;
const input = form.elements.todo;



// state management
// let todos;
// console.log(JSON.parse(localStorage.getItem("todos")));
// if (JSON.parse(localStorage.getItem("todos"))) {
//   todos = JSON.parse(localStorage.getItem("todos"));
// } else {
//   todos = [];
// }

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// [{ label: 1, complete: false } , { label: 2, complete: false }]

// functions

function saveToStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// render functinality
function renderTodos(todos) {
  // console.log(todos);
  let todosString = ``;

  // construct
  todos.forEach((todo, index) => {
    todosString += `
       <li id="${index}" ${todo.complete ? "class='todos-complete'" : ""}>
          <input type="checkbox" ${todo.complete ? "checked" : ""}>
          <span>${todo.label}</span>
          <button></button>
       </li>
     `;
  });

  //console.log(todosString);
  list.innerHTML = todosString;
  count.innerText = todos.filter((todo) => !todo.complete).length;

  clear.style.display = todos.filter((todo) => todo.complete).length
    ? "block"
    : "none";
}

// create/ add functionality
function addTodo(event) {
  event.preventDefault();
  const label = input.value.trim();
  const complete = false;

  const todo = { label, complete };
  todos = [...todos, todo];
  //  console.log(todos);
  renderTodos(todos);
  saveToStorage(todos);
  input.value = "";
}

// updateTodo
function updateTodo(event) {
  debugger;
  //  console.log(event.target);
  const id = Number(event.target.parentNode.getAttribute("id")); // 1
  const complete = event.target.checked; // true

  todos = todos.map((todo, index) => {
    if (id === index) {
      const updatedTodo = { ...todo, complete: complete };
      return updatedTodo;
    }
    return todo;
  });

  // console.log(todos);
  renderTodos(todos);
  saveToStorage(todos);
}

function editTodo(event) {
  // console.log(event.target.nodeName);
  if (event.target.nodeName !== "SPAN") {
    return;
  }

  //   1) FIND INPUT BOX INSIDE UL LIST
  //    2) IF YOU FIND THEN RETUN AND SHOW ALERT BOX(EDIT INPUT BOX ALREADY AVAIBALE PLEASE FILL THAT FIRST)

  const id = Number(event.target.parentNode.getAttribute("id"));
  const todoLabel = todos[id].label;
  console.log(todoLabel);

  const input = document.createElement("input");
  input.type = "text";
  input.value = todoLabel;
  console.dir(input);

  event.target.style.display = "none";
  event.target.parentNode.append(input);

  function handleEdit(event) {
    event.stopPropagation();
    const label = this.value;
    if (label !== todoLabel) {
      todos = todos.map((todo, index) => {
        if (index === id) {
          return {
            ...todo,
            label: label,
          };
        }
        return todo;
      });
    }

    renderTodos(todos);
    saveToStorage(todos);
  }

  input.addEventListener("change", handleEdit);
}

function deleteTodo(event) {
  // console.log(event.target.nodeName);
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  const id = Number(event.target.parentNode.getAttribute("id")); // 1
  todos = todos.filter((item, index) => index !== id);

  // console.log(todos);
  renderTodos(todos);
  saveToStorage(todos);
}

function clearCompleteTodo() {
  // debugger;
  let totalCLearCount = todos.filter((todo) => todo.complete).length;

  if (totalCLearCount === 0) {
    alert("please complete any task");
  }

  todos = todos.filter((todo) => !todo.complete);
  renderTodos(todos);
  saveToStorage(todos);
}

// init
function initi() {
  renderTodos(todos);

  //1 add functinality
  form.addEventListener("submit", addTodo);

  // 2 update functinality
  list.addEventListener("change", updateTodo);

  // 5 update label functinality
  list.addEventListener("dblclick", editTodo);

  // 3 delete functinality
  list.addEventListener("click", deleteTodo);

  // 4 clear functinality
  clear.addEventListener("click", clearCompleteTodo);
}

initi();


*/
