import { client } from "./client.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const formSearch = $(".form-search")
const inputSearch = $(".form-search input")
const btnAdd = $(".btn-add")
const btnSave = $(".btn-save")
const btnCancel = $(".btn-cancel")
const popup = $(".popup")
const overlay = $(".overlay")
const listTodoNotComplete = $(".not-complete")
const inputAddTodo = $(".add-todo")

var isEdit = false
let lt = /</g,
        gt = />/g,
        q = /'/g,
        dq = /"/g;
formSearch.addEventListener('submit', (e) => {e.preventDefault()})

const addPopup = () => {
  popup.classList.add('active')
  overlay.classList.add('active')
}

const removePopup = () => {
  popup.classList.remove('active')
  overlay.classList.remove('active')
  inputAddTodo.value = ""
}
btnAdd.addEventListener('click',addPopup)
btnCancel.addEventListener('click',removePopup)

const renderTodo = async () => {
  const {data:todos} = await client.get('/todos')
  
  const html = todos.map((todo) => `
    <div class="todo-item" data-id="${todo.id}">
      <span class="title-todo">${todo.name}</span>
      <div class="list-action">
        <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
        <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn-check"><i class="fa-solid fa-square-check"></i></button>  
      </div>
    </div>
  `).join("")
  listTodoNotComplete.innerHTML = html

  const deleteButtons = $$(".btn-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const todoId = button.closest(".todo-item").getAttribute("data-id");
      deleteTodo(todoId);
    });
  });

  const editButtons = $$(".btn-edit")
  editButtons.forEach((button) => {
    button.addEventListener("click",function() {
      isEdit = true
      const todoId = button.closest(".todo-item").getAttribute("data-id");
      addPopup()
      if(isEdit) {
        inputAddTodo.value =button.closest(".todo-item").querySelector(".title-todo").innerText
        btnSave.addEventListener("click",function() {
          updateTodo(todoId,inputAddTodo.value)
          removePopup()
        })
      }
    })
  })
}
renderTodo()

const deleteTodo = async (id) => {
  const {response} = await client.delete(`/todos/${id}`)
  renderTodo()
}

const addTodo = async () => {
  popup.addEventListener('submit',async function(e) {
    e.preventDefault()
    if(!isEdit) {
      let value = inputAddTodo.value
      value = value
                .replace(lt, "&lt;")
                .replace(gt, "&gt;")
                .replace(q, "&#39;")
                .replace(dq, "&#34;");
      removePopup()
      inputAddTodo.value = ""
      const {response} = await client.post('/todos', {name: value}) 
      renderTodo()
    }
  })
}
addTodo()

const updateTodo = async (id,value) => {
  value = value
                .replace(lt, "&lt;")
                .replace(gt, "&gt;")
                .replace(q, "&#39;")
                .replace(dq, "&#34;");
  const {response} = await client.put(`/todos/${id}`, {name: value})
  renderTodo()
}

function handleSearch() {
  inputSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
        const title = todo
            .querySelector(".title-todo")
            .textContent.toLowerCase();
        if (title.indexOf(value) === -1) {
            todo.classList.add("hide");
        } else {
            todo.classList.remove("hide");
        }
    });
  });
}
handleSearch();