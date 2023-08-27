const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const todoForm = $('.todo-form')
const todoList = $('.todo-list')
const todoInput = $('.todo-input')
const form = $('.form')
const dataTodo = []

function renderTodo() {
  let html = dataTodo
      .map((todo,i) => {
          return `<div class="todo-item todo-${i+1}">
            <p>${todo}</p>
            <div class="icon">
              <i class="fa-solid fa-pen-to-square btn-edit"></i>
              <i class="fa-solid fa-trash btn-remove"></i>
            </div>
        </div>`;
        }).join("");
  todoList.innerHTML = html;
  removeTodo()
  editTodo()
}

function addTodo() {
  todoForm.onsubmit = function(e) {
    e.preventDefault()
    if(todoInput.value.trim() !== '') {
      dataTodo.unshift(todoInput.value)
      todoInput.value = ''
      todoInput.focus()
      renderTodo()
    }
  }
}

function removeTodo() {
  if(dataTodo.length) {
    const btnRemove = $$(".btn-remove");
    btnRemove.forEach((todo, i) => {
      todo.addEventListener("click", function () {
        dataTodo.splice(i, 1);
        renderTodo()
      });
    });
  }
}

function editTodo() {
  if(dataTodo.length) {
    const btnEdit = $$(".btn-edit");
    btnEdit.forEach((todo, i) => {
      todo.addEventListener("click", function () {
        const todoEdit = $(`.todo-${i+1}`);
        const formEdit = document.createElement("form");
        formEdit.classList.add('todo-form__edit')
        formEdit.innerHTML = `<input type="text" placeholder="What is the task today?" class="todo-input">
        <button class="todo-btn">Add Task</button>`
        todoEdit.remove()
        todoList.insertBefore(formEdit, todoList.children[i]);
        const formUpdate = $('.todo-form__edit')
        const inputUpdate = formUpdate.querySelector("input");
        inputUpdate.value = todoEdit.children[0].innerText
        formUpdate.addEventListener('submit',function(e){
          e.preventDefault()
          if(inputUpdate.value.trim() !== '') {
            dataTodo.splice(i,1)
            dataTodo.splice(i,0,inputUpdate.value)
            renderTodo()
          }
        })
      });
    });
  }
}

addTodo()
removeTodo()
