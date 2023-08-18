// Bài 1 Lấy kết quả giao giữa 2 mảng
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

var result = arrA.filter((value) => arrB.includes(value))
console.log(result);

// Bài 2 Làm phẳng array
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
function flatArray(arr) {
  return arr.reduce((newArr,cur) => {
    if(Array.isArray(cur)) {
      return newArr.concat(flatArray(cur))
    } else {
      return newArr.concat(cur)
    }
  },[])
}
const result2 = flatArray(arr)
console.log(result2);

// Bài 3 Tách phần tử trong mảng theo đúng kiểu dữ liệu
var arr3 = [["a", 1, true], ["b", 2, false]]
var newArr = flatArray(arr3);
var result3 = [];
for (var i in newArr) {
  var value = newArr[i];
  var type = typeof value;
  if (!result3[type]) {
    result3[type] = [];
  }
  result3[type].push(value);
}
console.log(result3);

// Bài 4
const blogs = document.querySelector(".blogs");

var dataBlogs = [
  {
    img: "https://images.unsplash.com/photo-1691246806224-a6e9dde3678d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Tiêu đề bài viết 1",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint aut repellendus libero voluptates molestias odit quaerat veritatis, expedita eligendi neque nostrum reprehenderit alias doloremque ducimus consequuntur. Adipisci earum et quaerat debitis molestias nulla unde harum aliquid, ipsam quam perspiciatis consequatur.",
  },
  {
    img: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Tiêu đề bài viết 2",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint aut repellendus libero voluptates molestias odit quaerat veritatis, expedita eligendi neque nostrum reprehenderit alias doloremque ducimus consequuntur. Adipisci earum et quaerat debitis molestias nulla unde harum aliquid, ipsam quam perspiciatis consequatur.",
  },
  {
    img: "https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Tiêu đề bài viết 3",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint aut repellendus libero voluptates molestias odit quaerat veritatis, expedita eligendi neque nostrum reprehenderit alias doloremque ducimus consequuntur. Adipisci earum et quaerat debitis molestias nulla unde harum aliquid, ipsam quam perspiciatis consequatur.",
  },
];

var html = dataBlogs.map((blog) => (
  `
  <div class="blog-item">
    <div class="image">
        <img src="${blog.img}" alt="${blog.title}">
    </div>
    <div class="content">
        <h2 class="title">${blog.title}</h2>
        <p class="desc">${blog.desc}</p>
    </div>
  </div>
  `
)).join("")

blogs.innerHTML = html