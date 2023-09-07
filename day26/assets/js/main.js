var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

var timer = document.querySelector(".timer");

var isDrag = false;
var value = 0;
var initialClientX = 0;
var initialValue = 0;

var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");

var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var progressBarWidth = progressBar.clientWidth;

var getTime = function(second) {
    var minute = Math.floor(second / 60)
    var second = Math.floor(second - minute * 60)
    second = second < 10 ?`0${second}` : second
    minute = minute < 10 ? `0${minute}` : minute
    return `${minute}:${second}`
  }

  var handleUpdateValue = function(value) {
    if(value > 100) {
      value = 100
    }
    if(value < 0) {
      value = 0
    }
    progress.style.width = `${value}%`
  }

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    value = (100 * e.offsetX) / progressBarWidth;
    handleUpdateValue(value)
    initialValue = value;
    isDrag = true;
    initialClientX = e.clientX;
    var time = (audio.duration * value) / 100;
    currentTimeEl.innerText = getTime(time);
    audio.currentTime = time;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
    isDrag = true;
    initialClientX = e.clientX;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX
    value = (moveWidth / progressBarWidth) * 100 + initialValue
  }
  handleUpdateValue(value)
});

document.addEventListener("mouseup", function (e) {
    isDrag = false;
    initialValue = value;
    var time = (audio.duration * value) / 100;
    currentTimeEl.innerText = getTime(time);
    audio.currentTime = time;
});

audio.addEventListener("loadeddata", function () {
  durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if (!isDrag) {
    value = (100 * audio.currentTime) / audio.duration;
    progress.style.width = `${value}%`;
    currentTimeEl.innerText = getTime(audio.currentTime);
  }
});

audio.addEventListener("ended", function () {
  value = 0;
  audio.currentTime = 0;
  progress.style.width = `${value}%`;
  playBtn.innerHTML = playIcon;
});


progressBar.addEventListener("mousemove", function (e) {
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var space = (100 * e.offsetX) / progressBarWidth;
  var time = (audio.duration * space) / 100;
  timer.innerText = getTime(time);
});

progressBar.addEventListener("mouseout", function () {
    timer.style.display = "none";
  });
  
  progressSpan.addEventListener("mousemove", function (e) {
    e.stopPropagation();
  });
  
  progressSpan.addEventListener("mouseover", function (e) {
    e.stopPropagation();
    timer.style.display = "none";
  });
