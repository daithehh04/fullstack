const listPost = document.querySelector(".list-post")
const loader = document.querySelector(".loader-post")

import { client } from "./client.js";
let page = 1
let limit = 3
let isLoading = false;
let allDataLoaded = false

const getData = async (query={}) => {
  loader.classList.add('loader')
  const queryString = new URLSearchParams(query).toString();
  const {data} = await client.get(`/posts?${queryString}`)
  renderData(data)
  return data
} 
getData({ _limit: limit, _page: page })

const renderData = (posts) => {
  if(posts) {
    posts.forEach( async (post) => {
      const postItem = document.createElement('div')
      postItem.className = 'post-item'
      const userId = post.userId
      const categoryId = post.categoryId
      const {data:user} = await client.get(`/users/${userId}`)
      const {data:category} = await client.get(`/categories/${categoryId}`)
      postItem.innerHTML = `
        <div class="author">
          <img src="${user.avatar}" alt="" class="avatar">
          <h3 class="name">${user.name}</h3>
        </div>
        <div class="tag">
          ${post.tag.map(tagItem => `<span># ${tagItem}</span>`).join("")}
        </div>
        <div class="title">${post.title}</div>
        <img src="${post.image}" alt="" class="image">
        <p class="content">${post.content}</p>
        <span class="category">Category: ${category.name}</span>
      `
      listPost.appendChild(postItem)
      loader.classList.remove('loader')
    })
  }
}

function handleLoadMore() {
  if(isLoading) {
    return
  }
  isLoading = true
  loader.classList.add('loader')
  getData({ _limit: limit, _page: page++ }).then((data) => {
    isLoading = false;
    if(data.length === 0) {
      loader.classList.remove('loader')
      allDataLoaded = true
      if(allDataLoaded) {
        const p = document.createElement('p')
        p.className = 'loaded-data'
        p.textContent = 'All data loaded'
        listPost.appendChild(p)
      }
    }
  });
  
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 300 && !allDataLoaded) {
    handleLoadMore()
  }
});