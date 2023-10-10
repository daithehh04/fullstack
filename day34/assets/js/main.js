import { client } from "./client.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const formSearch = $(".form-search")
const inputSearch = $(".form-search input")
const btnAdd = $(".btn-add")
const btnSave = $(".btn-save")
const btnCancel = $(".btn-cancel")
const btnCompleted= $(".btn-completed")
const popup = $(".popup")
const overlay = $(".overlay")
const listTodoNotComplete = $(".not-complete")
const listTodoComplete = $(".completed")
const inputAddTodo = $(".add-todo")
const loading = $(".loading")

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

btnCompleted.addEventListener('click',function() {
  this.classList.toggle('active')
})
const renderTodo = async () => {
  loading.style.display = 'block'
  try {
  const {data:todos} = await client.get('/todos?completed=false')
  const {data:todosNot} = await client.get('/todos?completed=true')
  
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
  const htmlNot = todosNot.map((todo) => `
  <div class="todo-item" data-id="${todo.id}">
    <span class="title-todo">${todo.name}</span>
    <div class="list-action">
      <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
      <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn-done"><i class="fa-solid fa-square-check"></i></button>  
    </div>
  </div>
`).join("")
  listTodoNotComplete.innerHTML = html
  listTodoComplete.innerHTML = htmlNot

  btnCompleted.innerHTML = `Completed Todos ${todosNot.length} <i class="fa-regular fa-circle-right"></i>`
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

  const completeBtns = $$(".btn-check");
  completeBtns.forEach((completeBtn, i) => {
      completeBtn.addEventListener("click", async (e) => {
          const {data} = await client.get('/todos?completed=false')
          updateTodo(data[i].id,data[i].name ,true);
      });
  });
  const btnDones = $$(".btn-done");
  btnDones.forEach((btn, i) => {
        btn.addEventListener("click", async (e) => {
          const {data} = await client.get('/todos?completed=true')
          updateTodo(data[i].id,data[i].name ,false);
        });
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
  finally {
    loading.style.display = 'none';
  }
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
      const {response} = await client.post('/todos', {name: value,completed: false}) 
      renderTodo()
    }
  })
}
addTodo()

const updateTodo = async (id,value,isCompleted=false) => {
  value = value
                ?.replace(lt, "&lt;")
                ?.replace(gt, "&gt;")
                ?.replace(q, "&#39;")
                ?.replace(dq, "&#34;");
  const {response} = await client.put(`/todos/${id}`, {name: value,completed:isCompleted})
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