var carousel = document.querySelector('.carousel')
var carouselInner = carousel.querySelector('.carousel-inner')

var carouselNav = carousel.querySelector('.carousel-nav')
var carouselDots  = carousel.querySelector('.carousel-dots')

var carouselItems = carousel.querySelectorAll('.item') 

var nextBtn = carouselNav.querySelector('.next')
var prevBtn = carouselNav.querySelector('.prev')

// Lấy danh sách các item
var carouselItem = carouselInner.children

// Tính chiều rộng của 1 item
var itemWidth = carouselInner.clientWidth

// Tính tổng kích thước cái item
var totalWidth = itemWidth * carouselItem.length

// Cập nhật css cho carousel inner
carouselInner.style.width = `${totalWidth}px`

// ====================================================


var pagination = Array.from(carouselItem).map((item,index) => (
  `<span class="${index === 0 ? "active" : ""}" data-index="${index}"></span>`
)).join("")

carouselDots.innerHTML = pagination;

var dotsItem = carouselDots.querySelectorAll('span')

var currentIndex = 0;
var position = 0;

var moveSlide = function () {
  carouselInner.style.translate = `${position}px`;
  dotsItem.forEach(function (dot, i) {
    if (dot.classList.contains("active")) {
      dot.classList.remove("active");
    }
    if (currentIndex === +dot.dataset.index) {
      dot.classList.add("active");
    }
  });
  handleBtn()
}

function handleBtn() {
  if(currentIndex === 0) {
    prevBtn.classList.add('disable')
  } else {
    prevBtn.classList.remove('disable')
  }
  if(currentIndex === dotsItem.length - 1) {
    nextBtn.classList.add('disable')
  } else {
    nextBtn.classList.remove('disable')
  }
}

handleBtn()

var handlePagination = function () {
  dotsItem.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      currentIndex = +dot.dataset.index
      position = -itemWidth * currentIndex;
      moveSlide();
    });
  });
};

handlePagination()

nextBtn.addEventListener('click',function() {
  if (currentIndex < dotsItem.length - 1) {
    currentIndex++;
    position -= itemWidth;
    moveSlide();
  }
})

prevBtn.addEventListener('click',function() {
  if (currentIndex > 0) {
    currentIndex--;
    position += itemWidth;
    moveSlide();
  }
})

var isDrag = false;
var startX = 0;
var pageXMove = 0;
carouselInner.addEventListener("mousedown", function (e) {
  isDrag = true;
  startX = e.pageX;
});

carouselInner.addEventListener("mousemove", function (e) {
  e.preventDefault()
  if(isDrag) {{
    carouselInner.style.cursor = "move";
    carouselInner.style.transition = `none`;
    var distance = startX - e.pageX;
    if (distance > 120) {
      if (currentIndex < dotsItem.length - 1) {
        currentIndex++;
        position -= itemWidth;
        moveSlide();
        carouselInner.style.transition = `all 0.4s linear`;
      }
      isDrag = false
    } else if (distance > 0) {
      carouselInner.style.translate = `${position - distance}px`;
    }
    if (distance < -120) {
      if (currentIndex > 0) {
        currentIndex--;
        position += itemWidth;
        moveSlide();
        carouselInner.style.transition = `all 0.4s linear`;
      }
      isDrag = false
    } else if (distance < 0) {
      carouselInner.style.translate = `${position - distance}px`;
    }
  }}
});

carouselInner.addEventListener("mouseup", function (e) {
  isDrag = false;
  carouselInner.style.cursor = `default`;
  carouselInner.style.transition = `all 0.4s linear`;
  carouselInner.style.translate = `${position}px`;
});

