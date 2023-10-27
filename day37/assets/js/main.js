import {client} from './client.js'
import { datePicker } from './date-picker.js'
import { regexEmail,regexPhone,regexLink,regexYoutube } from './regex.js'
const root = document.querySelector('#root')
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
const divBlogDetail = document.createElement('div')
divBlogDetail.className = 'blog-detail'
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
const htmlBlog = (blog,check) => {
  const nameUser = blog?.userId?.name
    const avatar = nameUser?.trim()[0]
    // time create blog
    const createTime = blog.createdAt
    const currentTime = new Date();
    const createdAt = new Date(createTime);
    const timeDifference = currentTime - createdAt;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const timeBlog = formatTimeDifference(daysDifference, hoursDifference, minutesDifference);
    const dateOfBlog = `${createdAt.getDate()} / ${createdAt.getMonth() + 1} / ${createdAt.getFullYear()} | 
    ${createdAt.getHours()}:${createdAt.getMinutes() < 10? "0" + createdAt.getMinutes(): createdAt.getMinutes()
  }`;
    let content = blog?.content
    // Cắt nhiều dấu cách thành 1 dấu cách
    content = content?.replace(/\s+/g, " ")
    // Cắt nhiều dấu xuống dòng thành 1 dấu xuống dòng
    content = content?.replace(/\n{2,}/g, "\n");
    // Handle Regex
    content = regexYoutube(content)
    content = regexEmail(content)
    content = regexPhone(content)
    content = regexLink(content)
    return (
      `<div class="blog-item">
            <div class="info">
              <div class="avatar">${avatar}</div>
              <div>
                <div class="name">${blog.userId?.name}</div>
                <div class="time-create">${timeBlog}</div>
              </div>
            </div>
            <div class="content">
              <div class="date-blog">${dateOfBlog}</div>
              <div class="title">${blog?.title}</div>
              <div class="desc">${content}</div>
            </div>
            ${!check ? 
            `<a href="#" target="_blank" class="btn-detail" data-id =${blog?._id}># View more</a>`
            : ''}
          </div>
      `
    )
}
const renderBlogs = async() => {
  const { data: blogs } = await client.get("/blogs");
  isLoading = false
  loading()
  let check = false
  const html = blogs.data.map((blog) => {
    return htmlBlog(blog,check)
  }).join("")
  listBlog.innerHTML = html

  // Handle view detail
  const btnDetail = document.querySelectorAll('.btn-detail')
  btnDetail.forEach((btn) => {
    btn.addEventListener('click',async function(e) {
      e.preventDefault()
      const token = JSON.parse(localStorage.getItem('login_token'))
      if(token) {
        if(token.accessToken) {
          isLoading = true
          loading()
          e.preventDefault()
          const id = btn.getAttribute('data-id')
          const {data,response} = await client.get(`/blogs/${id}`)
          isLoading = false
          loading()
          let check = true
          if(response.ok) {
            divBlogDetail.innerHTML = htmlBlog(data,check)
            overlay.classList.add('show')
            divBlogDetail.innerHTML = htmlBlog(data.data)
            root.append(divBlogDetail)
          }
        }
      }else {
        Toastify({
          text: `Đăng nhập để xem !`,
          close: true,
          className: "info",
          style: {
            background: "#ea8685",
          }
        }).showToast();
      }
    })
  })
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
  divBlogDetail.remove()
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

// Get profile user
const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.accessToken) {
      client.setToken(token.accessToken)
      const {data,response} = await client.get(`/users/profile`)
      if(!response.ok) {
        const {data,response} = await requestRefresh(token.refreshToken)
        if(response.ok) {
          localStorage.setItem("login_token",JSON.stringify(data.data.token))
          getProfile()
        } else {
          handleSignOut()
        }
      } else {
        name.innerText = 'Hi, ' + data.data.name
      }
    } 
  }
}
const formPost = document.createElement('form')
formPost.className = 'form-post'
formPost.innerHTML = `
  <div class="row-input">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" class="title" required/>
  </div>
  <div class="row-input">
    <label for="content">Content</label>
    <textarea name="content" id="content" cols="30" rows="10" class="content" required></textarea>
  </div>
  <div class="row-input">
    <label for="time">Choose date</label>
    <input id="date-picker"/>
  </div>
  <button>Post Blog</button>
  `

const handleLogged = () => {
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.accessToken) {
      formPostBlog.append(formPost)
      const date = document.getElementById("date-picker");
      datePicker(date)
      name.style.display = 'block'
      getProfile()
      btnSignIn.classList.add('hidden')
      btnSignOut.classList.remove('hidden')
      
      const handlePostBlog = async() => {
        const titleEle = document.querySelector('.form-post .title')
        const contentEle = document.querySelector('.form-post .content')
        const dataPost = {
          title: titleEle.value,
          content: contentEle.value
        }
        client.setToken(token.accessToken)
        isLoading = true
        loading()
        const {data:info,response} = await client.post('/blogs', dataPost);
        isLoading = false
        loading()
        if(!response.ok) {
          const {data,response} = await requestRefresh(token.refreshToken)
          if(response.ok) {
            localStorage.setItem("login_token",JSON.stringify(data.data.token))
            handlePostBlog()
          } 
          else {
              formPost.reset()
              Toastify({
                text: `Đăng bài thất bại`,
                close: true,
                className: "info",
                style: {
                  background: "#ea8685",
                }
              }).showToast();
            }
        } else {
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
      }
      formPost.addEventListener('submit', async (e) => {
        e.preventDefault()
        const time =(date._flatpickr.selectedDates[0]?.toString())
        const dateTime = new Date(time)
        const datePostBlog = `${dateTime.getDate()} / ${dateTime.getMonth() + 1} / ${dateTime.getFullYear()} lúc 
          ${dateTime.getHours()} : ${dateTime.getMinutes() < 10? "0" + dateTime.getMinutes(): dateTime.getMinutes()
        }`
        console.log(time);
        if(time) {
          isLoading = true
          loading()
          setTimeout(() => {
            Toastify({
              text: `Bài viết sẽ được đăng vào ngày ${datePostBlog}`,
              close: true,
              className: "info",
              style: {
                background: "#4b7bec",
              }
            }).showToast();
            formPost.reset()
            isLoading = false
            loading()
          },1000)
        } else {
          handlePostBlog()
        }
      })
    }
  }
}
handleLogged()
// handle sign out
const handleSignOut = async () => {
  const formPost = document.querySelector('.form-post')
  const token = JSON.parse(localStorage.getItem('login_token'))
  if(token) {
    if(token.accessToken) {
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
      } else {
        const {data,response} = await requestRefresh(token.refreshToken)
        if(response.ok) {
          localStorage.setItem("login_token",JSON.stringify(data.data.token))
          handleSignOut()
        } else {
          Toastify({
            text: `${info.message}`,
            close: true,
            className: "info",
            style: {
              background: "#ea8685",
            }
          }).showToast();
          handleReset()
          localStorage.removeItem('login_token')
          formPost.remove()
          btnSignIn.classList.remove('hidden')
          btnSignOut.classList.add('hidden')
          name.style.display='none'
        }
      }
    }
  }
}
btnSignOut.addEventListener('click',handleSignOut)

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
        background: "#ea8685",
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
const requestRefresh = (refreshToken) => {
  return client.post("/auth/refresh-token",{
      refreshToken
    })
}