import {client} from './client.js'
const listBlog = document.querySelector('.list-blog')
const formLogin = document.querySelector('.form-login')
const formRegister = document.querySelector('.form-register')
const btnSignIn = document.querySelector('.btn-sign_in')
const btnSignOut = document.querySelector('.btn-sign_out')
const overlay = document.querySelector('.overlay')
const btnFormLogin = document.querySelector('.btn-create')
const btnFormRegister = document.querySelector('.btn-sign')
const emailLogin = document.querySelector('.email-login')
const passwordLogin = document.querySelector('.password-login')
const formPostBlog = document.querySelector('.form-post_blog')
const name = document.querySelector('.header .author')
const loader = document.querySelector('.loader')
const overlayLoader = document.querySelector('.overlay-loader')
let isLoading = true

const loading = () => {
  if(!isLoading) {
    loader.style.display = 'none'
    overlayLoader.style.display = 'none'
  } else {
    loader.style.display = 'block'
    overlayLoader.style.display = 'block'
  }
}
const renderBlogs = async() => {
  const { data: blogs } = await client.get("/blogs");
  isLoading = false
  loading()
  const html = blogs.data.map((blog) => {
    const nameUser = blog.userId.name
    const avatar = nameUser.trim()[0]
    // time create blog
    const createTime = blog.createdAt
    const currentTime = new Date();
    const createdAt = new Date(createTime);
    const timeDifference = currentTime - createdAt;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    function formatTimeDifference(days, hours, minutes) {
      let result = "";
      if (days > 0) {
        result += days + " day" + (days > 1 ? "s" : "") + " ";
      }
      if (hours > 0) {
        result += hours + " hour" + (hours > 1 ? "s" : "") + " ";
      }
      if (minutes > 0) {
        result += minutes + " minute" + (minutes > 1 ? "s" : "") + " ";
      }
      if (result === "") {
        return "just now";
      }
      return result + "ago";
    }
    const timeBlog = formatTimeDifference(daysDifference, hoursDifference, minutesDifference);
    return (
      `<div class="blog-item">
            <div class="info">
              <div class="avatar">${avatar}</div>
              <div>
                <div class="name">${blog.userId.name}</div>
                <div class="time-create">${timeBlog}</div>
              </div>
            </div>
            <div class="content">
              <div class="title">${blog.title}</div>
              <div class="desc">${blog.content}</div>
            </div>
            <a href="#" target="_blank" class="btn-detail"># View more</a>
            <a href="#" target="_blank" class="btn-profile"># ${blog.userId.name}</a>
          </div>
      `
    )
  }).join("")
  listBlog.innerHTML = html
}
renderBlogs()

btnSignIn.addEventListener('click',function() {
  formLogin.classList.add('show')
  overlay.classList.add('show')
})

function handleReset() {
  formLogin.classList.remove('show')
  formRegister.classList.remove('show')
  overlay.classList.remove('show')
  formLogin.reset()
  formRegister.reset()
}
overlay.addEventListener('click',handleReset)
btnFormLogin.addEventListener('click',function() {
  formRegister.classList.add('show')
  formLogin.classList.remove('show')
})
function handleSwitchLogin() {
  formLogin.classList.add('show')
  formRegister.classList.remove('show')
}
btnFormRegister.addEventListener('click',handleSwitchLogin)

const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.accessToken) {
      client.setToken(token.accessToken)
      const {data,response} = await client.get(`/users/profile`)
      if(!response.ok) {
        requestRefresh()
      } else {
        name.innerText = 'Hi, ' + data.data.name
      }
    } 
  }
}



const handleLogged = () => {
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.accessToken) {
      const formPost = document.createElement('form')
      formPost.className = 'form-post'
      formPost.innerHTML = `
        <div class="row-input">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" class="title">
        </div>
        <div class="row-input">
          <label for="content">Content</label>
          <textarea name="content" id="content" cols="30" rows="10" class="content"></textarea>
        </div>
        <button>Post Blog</button>
        `
      formPostBlog.append(formPost)
      name.style.display = 'block'
      getProfile()
      btnSignIn.classList.add('hidden')
      btnSignOut.classList.remove('hidden')
      // handle sign out
      btnSignOut.addEventListener('click',async function() {
        client.setToken(token.accessToken)
        isLoading = true
        loading()
        const { data: info } = await client.post("/auth/logout", {});
        isLoading = false
        loading()
        if(info.status_code === 'SUCCESS') {
          Toastify({
            text: `${info.message}`,
            close: true,
            className: "info",
            style: {
              background: "#55efc4",
            }
          }).showToast();
          handleReset()
          localStorage.removeItem('login_token')
          formPost.remove()
          btnSignIn.classList.remove('hidden')
          btnSignOut.classList.add('hidden')
          name.style.display='none'
          handleLogged()
        } else {
          Toastify({
            text: `${info.message}`,
            close: true,
            className: "info",
            style: {
              background: "#55efc4",
            }
          }).showToast();
          requestRefresh()
          localStorage.removeItem('login_token')
          formPost.remove()
          btnSignIn.classList.remove('hidden')
          btnSignOut.classList.add('hidden')
          name.style.display='none'
          handleLogged()
        }
      })
      const titleEle = document.querySelector('.form-post .title')
      const contentEle = document.querySelector('.form-post .content')
      formPost.addEventListener('submit', async function(e) {
        client.setToken(token.accessToken)
        e.preventDefault()
        const dataPost = {
          title: titleEle.value,
          content: contentEle.value
        }
        isLoading = true
        loading()
        const { data: info,response } = await client.post('/blogs', dataPost);
        isLoading = true
        loading()
        if(response.ok) {
          Toastify({
            text: `${info.message}`,
            close: true,
            className: "info",
            style: {
              background: "#55efc4",
            }
          }).showToast();
          renderBlogs()
          formPost.reset()
        }
      })
    }
  } 
}
handleLogged()
const handleLogin = async (data) => {
  isLoading = true
  loading()
  const {data:info,response} = await client.post('/auth/login',data)
  isLoading = false
  loading()
  if(info.status_code === 'FAILED') {
    Toastify({
      text: `${info.message}`,
      close: true,
      className: "info",
      style: {
        background: "#ff7675",
      }
    }).showToast();
  } else {
    if(info.status_code === 'SUCCESS') {
      const tokens = {
        accessToken: info.data.accessToken,
        refreshToken: info.data.refreshToken
      }
      localStorage.setItem('login_token',JSON.stringify(tokens))
      Toastify({
        text: `${info.message}`,
        close: true,
        className: "info",
        style: {
          background: "#55efc4",
        }
      }).showToast();
      handleReset()
      handleLogged()
    }
  }
}

const handleRegister = async (data) => {
  isLoading = true
  loading()
  const {data:info,response} = await client.post('/auth/register',data)
  isLoading = false
  loading()
  if(info.status_code === 'FAILED') {
    Toastify({
      text: `${info.message}`,
      close: true,
      className: "info",
      style: {
        background: "#ff7675",
      }
    }).showToast();
  }
  if(info.status_code === 'SUCCESS') {
    handleSwitchLogin()
    emailLogin.value = email.value
    Toastify({
      text: `${info.message}`,
      close: true,
      className: "info",
      style: {
        background: "#55efc4",
      }
    }).showToast();
  }
}
formLogin.addEventListener('submit',async function(e) {
  e.preventDefault()
  const email = emailLogin.value
  const password = passwordLogin.value
  const data = {email,password}
  handleLogin(data)
})

formRegister.addEventListener('submit',async function(e) {
  e.preventDefault()
  const email = e.target.querySelector('.email-register')
  const password = e.target.querySelector('.password-register')
  const name = e.target.querySelector('.name-register')
  if(password.value.trim().length < 8) {
    Toastify({
      text: `Password phải có ít nhất 8 ký tự`,
      close: true,
      className: "info",
      style: {
        background: "#ff7675",
      }
    }).showToast();
  } else {
    const data = {
      email:email.value,
      password:password.value,
      name: name.value
    }
    handleRegister(data)
  }
})

// 
const requestRefresh = async () => {
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.refreshToken) {
      const {data,response} = await client.post("/auth/refresh-token",{
        refreshToken: token.refreshToken
      })
      if(response.ok) {
        localStorage.setItem('login_token',JSON.stringify(data.data.token))
      }
    }
  }
  renderBlogs()
}
