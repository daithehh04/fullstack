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
    handleLyric(audio.currentTime)
  }
});

audio.addEventListener("ended", function () {
  value = 0;
  audio.currentTime = 0;
  progress.style.width = `${value}%`;
  playBtn.innerHTML = playIcon;
});


progressBar.addEventListener("mousemove", function (e) {
    e.stopPropagation()
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var rate = (100 * e.offsetX) / progressBarWidth;
  var time = (audio.duration * rate) / 100;
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

  // Karaoke
  var lyric =` [
            {
                "words": [
                    {
                        "startTime": 9130,
                        "endTime": 9680,
                        "data": "Giữa"
                    },
                    {
                        "startTime": 9680,
                        "endTime": 10190,
                        "data": "mênh"
                    },
                    {
                        "startTime": 10190,
                        "endTime": 10190,
                        "data": "mang"
                    },
                    {
                        "startTime": 10190,
                        "endTime": 10740,
                        "data": "đồi"
                    },
                    {
                        "startTime": 10740,
                        "endTime": 10740,
                        "data": "hoa"
                    },
                    {
                        "startTime": 10740,
                        "endTime": 11280,
                        "data": "cỏ"
                    },
                    {
                        "startTime": 11280,
                        "endTime": 11790,
                        "data": "lau"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 11790,
                        "endTime": 11790,
                        "data": "Chỉ"
                    },
                    {
                        "startTime": 11790,
                        "endTime": 12330,
                        "data": "tiếc"
                    },
                    {
                        "startTime": 12330,
                        "endTime": 12330,
                        "data": "anh"
                    },
                    {
                        "startTime": 12330,
                        "endTime": 12860,
                        "data": "luôn"
                    },
                    {
                        "startTime": 12860,
                        "endTime": 12860,
                        "data": "là"
                    },
                    {
                        "startTime": 12860,
                        "endTime": 13380,
                        "data": "người"
                    },
                    {
                        "startTime": 13380,
                        "endTime": 13380,
                        "data": "đến"
                    },
                    {
                        "startTime": 13380,
                        "endTime": 13900,
                        "data": "sau"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 13900,
                        "endTime": 13900,
                        "data": "Một"
                    },
                    {
                        "startTime": 13900,
                        "endTime": 14460,
                        "data": "cuộc"
                    },
                    {
                        "startTime": 14460,
                        "endTime": 14460,
                        "data": "tình"
                    },
                    {
                        "startTime": 14460,
                        "endTime": 14970,
                        "data": "anh"
                    },
                    {
                        "startTime": 14970,
                        "endTime": 14970,
                        "data": "vẫn"
                    },
                    {
                        "startTime": 14970,
                        "endTime": 15510,
                        "data": "cố"
                    },
                    {
                        "startTime": 15510,
                        "endTime": 16050,
                        "data": "giấu"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 16050,
                        "endTime": 16570,
                        "data": "Giữ"
                    },
                    {
                        "startTime": 16570,
                        "endTime": 16570,
                        "data": "riêng"
                    },
                    {
                        "startTime": 16570,
                        "endTime": 17100,
                        "data": "anh"
                    },
                    {
                        "startTime": 17100,
                        "endTime": 17100,
                        "data": "nỗi"
                    },
                    {
                        "startTime": 17100,
                        "endTime": 17660,
                        "data": "sầu"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 17660,
                        "endTime": 18170,
                        "data": "Và"
                    },
                    {
                        "startTime": 18170,
                        "endTime": 18170,
                        "data": "gió"
                    },
                    {
                        "startTime": 18170,
                        "endTime": 18680,
                        "data": "đêm"
                    },
                    {
                        "startTime": 18680,
                        "endTime": 19250,
                        "data": "mây"
                    },
                    {
                        "startTime": 19250,
                        "endTime": 19250,
                        "data": "từ"
                    },
                    {
                        "startTime": 19250,
                        "endTime": 19760,
                        "data": "đâu"
                    },
                    {
                        "startTime": 19760,
                        "endTime": 19760,
                        "data": "đến"
                    },
                    {
                        "startTime": 19760,
                        "endTime": 19760,
                        "data": "đây"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 19600,
                        "endTime": 20000,
                        "data": "Mà"
                    },
                    {
                        "startTime": 20000,
                        "endTime": 20410,
                        "data": "khiến"
                    },
                    {
                        "startTime": 20410,
                        "endTime": 20410,
                        "data": "con"
                    },
                    {
                        "startTime": 20410,
                        "endTime": 20800,
                        "data": "tim"
                    },
                    {
                        "startTime": 20800,
                        "endTime": 21190,
                        "data": "mình"
                    },
                    {
                        "startTime": 21190,
                        "endTime": 21190,
                        "data": "đau"
                    },
                    {
                        "startTime": 21190,
                        "endTime": 21600,
                        "data": "đến"
                    },
                    {
                        "startTime": 21600,
                        "endTime": 22000,
                        "data": "vậy"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 22000,
                        "endTime": 22400,
                        "data": "Vì"
                    },
                    {
                        "startTime": 22400,
                        "endTime": 22800,
                        "data": "một"
                    },
                    {
                        "startTime": 22800,
                        "endTime": 22800,
                        "data": "người"
                    },
                    {
                        "startTime": 22800,
                        "endTime": 23190,
                        "data": "đã"
                    },
                    {
                        "startTime": 23190,
                        "endTime": 23590,
                        "data": "đến"
                    },
                    {
                        "startTime": 23590,
                        "endTime": 23980,
                        "data": "chiếm"
                    },
                    {
                        "startTime": 23980,
                        "endTime": 23980,
                        "data": "lấy"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 23980,
                        "endTime": 24380,
                        "data": "Những"
                    },
                    {
                        "startTime": 24380,
                        "endTime": 24780,
                        "data": "rung"
                    },
                    {
                        "startTime": 24780,
                        "endTime": 25180,
                        "data": "động"
                    },
                    {
                        "startTime": 25180,
                        "endTime": 25580,
                        "data": "về"
                    },
                    {
                        "startTime": 25580,
                        "endTime": 26780,
                        "data": "em"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 26780,
                        "endTime": 27170,
                        "data": "Nhìn"
                    },
                    {
                        "startTime": 27170,
                        "endTime": 27170,
                        "data": "bông"
                    },
                    {
                        "startTime": 27170,
                        "endTime": 27560,
                        "data": "lau"
                    },
                    {
                        "startTime": 27560,
                        "endTime": 27980,
                        "data": "nghiêng"
                    },
                    {
                        "startTime": 27980,
                        "endTime": 28370,
                        "data": "giống"
                    },
                    {
                        "startTime": 28370,
                        "endTime": 28760,
                        "data": "như"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 28760,
                        "endTime": 28760,
                        "data": "Lòng"
                    },
                    {
                        "startTime": 28760,
                        "endTime": 29170,
                        "data": "mình"
                    },
                    {
                        "startTime": 29170,
                        "endTime": 29570,
                        "data": "còn"
                    },
                    {
                        "startTime": 29570,
                        "endTime": 29570,
                        "data": "nhiều"
                    },
                    {
                        "startTime": 29570,
                        "endTime": 29950,
                        "data": "chơi"
                    },
                    {
                        "startTime": 29950,
                        "endTime": 30770,
                        "data": "vơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 30770,
                        "endTime": 31160,
                        "data": "Chiều"
                    },
                    {
                        "startTime": 31160,
                        "endTime": 31160,
                        "data": "mưa"
                    },
                    {
                        "startTime": 31160,
                        "endTime": 31570,
                        "data": "rơi"
                    },
                    {
                        "startTime": 31570,
                        "endTime": 31950,
                        "data": "không"
                    },
                    {
                        "startTime": 31950,
                        "endTime": 32360,
                        "data": "bến"
                    },
                    {
                        "startTime": 32360,
                        "endTime": 32760,
                        "data": "đợi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 32760,
                        "endTime": 33160,
                        "data": "Nhưng"
                    },
                    {
                        "startTime": 33160,
                        "endTime": 33540,
                        "data": "anh"
                    },
                    {
                        "startTime": 33540,
                        "endTime": 33540,
                        "data": "vẫn"
                    },
                    {
                        "startTime": 33540,
                        "endTime": 33930,
                        "data": "chờ"
                    },
                    {
                        "startTime": 33930,
                        "endTime": 34350,
                        "data": "em"
                    },
                    {
                        "startTime": 34350,
                        "endTime": 34740,
                        "data": "tới"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 34740,
                        "endTime": 35140,
                        "data": "Ngàn"
                    },
                    {
                        "startTime": 35140,
                        "endTime": 35550,
                        "data": "yêu"
                    },
                    {
                        "startTime": 35550,
                        "endTime": 35940,
                        "data": "thương"
                    },
                    {
                        "startTime": 35940,
                        "endTime": 36340,
                        "data": "sau"
                    },
                    {
                        "startTime": 36340,
                        "endTime": 36750,
                        "data": "cuối"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 36750,
                        "endTime": 37140,
                        "data": "Xin"
                    },
                    {
                        "startTime": 37140,
                        "endTime": 37140,
                        "data": "được"
                    },
                    {
                        "startTime": 37140,
                        "endTime": 37540,
                        "data": "là"
                    },
                    {
                        "startTime": 37540,
                        "endTime": 37930,
                        "data": "bầu"
                    },
                    {
                        "startTime": 37930,
                        "endTime": 38330,
                        "data": "trời"
                    },
                    {
                        "startTime": 38330,
                        "endTime": 38330,
                        "data": "em"
                    },
                    {
                        "startTime": 38330,
                        "endTime": 39130,
                        "data": "ơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 39130,
                        "endTime": 39530,
                        "data": "Yêu"
                    },
                    {
                        "startTime": 39530,
                        "endTime": 39920,
                        "data": "em"
                    },
                    {
                        "startTime": 39920,
                        "endTime": 39920,
                        "data": "không"
                    },
                    {
                        "startTime": 39920,
                        "endTime": 40330,
                        "data": "nghỉ"
                    },
                    {
                        "startTime": 40330,
                        "endTime": 40720,
                        "data": "ngơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 40720,
                        "endTime": 41120,
                        "data": "Gã"
                    },
                    {
                        "startTime": 41120,
                        "endTime": 41530,
                        "data": "si"
                    },
                    {
                        "startTime": 41530,
                        "endTime": 41930,
                        "data": "tình"
                    },
                    {
                        "startTime": 41930,
                        "endTime": 41930,
                        "data": "chỉ"
                    },
                    {
                        "startTime": 41930,
                        "endTime": 42310,
                        "data": "cần"
                    },
                    {
                        "startTime": 42310,
                        "endTime": 42700,
                        "data": "thế"
                    },
                    {
                        "startTime": 42700,
                        "endTime": 44320,
                        "data": "thôi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 44320,
                        "endTime": 44700,
                        "data": "Nhìn"
                    },
                    {
                        "startTime": 44700,
                        "endTime": 45100,
                        "data": "ngọn"
                    },
                    {
                        "startTime": 45100,
                        "endTime": 45100,
                        "data": "đèn"
                    },
                    {
                        "startTime": 45100,
                        "endTime": 45510,
                        "data": "mờ"
                    },
                    {
                        "startTime": 45510,
                        "endTime": 45900,
                        "data": "vội"
                    },
                    {
                        "startTime": 45900,
                        "endTime": 46300,
                        "data": "tắt"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 46300,
                        "endTime": 46700,
                        "data": "Mưa"
                    },
                    {
                        "startTime": 46700,
                        "endTime": 47100,
                        "data": "đánh"
                    },
                    {
                        "startTime": 47100,
                        "endTime": 47490,
                        "data": "rơi"
                    },
                    {
                        "startTime": 47490,
                        "endTime": 47890,
                        "data": "trong"
                    },
                    {
                        "startTime": 47890,
                        "endTime": 48290,
                        "data": "mắt"
                    },
                    {
                        "startTime": 48290,
                        "endTime": 49100,
                        "data": "anh"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 49100,
                        "endTime": 49100,
                        "data": "Tìm"
                    },
                    {
                        "startTime": 49100,
                        "endTime": 49500,
                        "data": "hình"
                    },
                    {
                        "startTime": 49500,
                        "endTime": 49880,
                        "data": "bóng"
                    },
                    {
                        "startTime": 49880,
                        "endTime": 51080,
                        "data": "của"
                    },
                    {
                        "startTime": 51080,
                        "endTime": 53080,
                        "data": "em"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 53080,
                        "endTime": 53480,
                        "data": "Và"
                    },
                    {
                        "startTime": 53480,
                        "endTime": 53480,
                        "data": "dòng"
                    },
                    {
                        "startTime": 53480,
                        "endTime": 53870,
                        "data": "đời"
                    },
                    {
                        "startTime": 53870,
                        "endTime": 54280,
                        "data": "nhiều"
                    },
                    {
                        "startTime": 54280,
                        "endTime": 54660,
                        "data": "mộng"
                    },
                    {
                        "startTime": 54660,
                        "endTime": 55050,
                        "data": "ước"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 55050,
                        "endTime": 55860,
                        "data": "Mong"
                    },
                    {
                        "startTime": 55860,
                        "endTime": 55860,
                        "data": "bên"
                    },
                    {
                        "startTime": 55860,
                        "endTime": 56250,
                        "data": "em"
                    },
                    {
                        "startTime": 56250,
                        "endTime": 56650,
                        "data": "sẽ"
                    },
                    {
                        "startTime": 56650,
                        "endTime": 57060,
                        "data": "mãi"
                    },
                    {
                        "startTime": 57060,
                        "endTime": 57460,
                        "data": "yên"
                    },
                    {
                        "startTime": 57460,
                        "endTime": 58260,
                        "data": "bình"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 58260,
                        "endTime": 58650,
                        "data": "Tuổi"
                    },
                    {
                        "startTime": 58650,
                        "endTime": 58650,
                        "data": "xuân"
                    },
                    {
                        "startTime": 58650,
                        "endTime": 59060,
                        "data": "đẹp"
                    },
                    {
                        "startTime": 59060,
                        "endTime": 59450,
                        "data": "như"
                    },
                    {
                        "startTime": 59450,
                        "endTime": 60240,
                        "data": "ánh"
                    },
                    {
                        "startTime": 60240,
                        "endTime": 62650,
                        "data": "trăng"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 62650,
                        "endTime": 63040,
                        "data": "Giữa"
                    },
                    {
                        "startTime": 63040,
                        "endTime": 63440,
                        "data": "mênh"
                    },
                    {
                        "startTime": 63440,
                        "endTime": 63830,
                        "data": "mang"
                    },
                    {
                        "startTime": 63830,
                        "endTime": 64240,
                        "data": "đồi"
                    },
                    {
                        "startTime": 64240,
                        "endTime": 64240,
                        "data": "hoa"
                    },
                    {
                        "startTime": 64240,
                        "endTime": 64630,
                        "data": "cỏ"
                    },
                    {
                        "startTime": 64630,
                        "endTime": 65030,
                        "data": "lau"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 65030,
                        "endTime": 65410,
                        "data": "Chỉ"
                    },
                    {
                        "startTime": 65410,
                        "endTime": 65820,
                        "data": "tiếc"
                    },
                    {
                        "startTime": 65820,
                        "endTime": 65820,
                        "data": "anh"
                    },
                    {
                        "startTime": 65820,
                        "endTime": 66220,
                        "data": "luôn"
                    },
                    {
                        "startTime": 66220,
                        "endTime": 66220,
                        "data": "là"
                    },
                    {
                        "startTime": 66220,
                        "endTime": 66610,
                        "data": "người"
                    },
                    {
                        "startTime": 66610,
                        "endTime": 66610,
                        "data": "đến"
                    },
                    {
                        "startTime": 66610,
                        "endTime": 67030,
                        "data": "sau"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 67030,
                        "endTime": 67410,
                        "data": "Một"
                    },
                    {
                        "startTime": 67410,
                        "endTime": 67810,
                        "data": "cuộc"
                    },
                    {
                        "startTime": 67810,
                        "endTime": 67810,
                        "data": "tình"
                    },
                    {
                        "startTime": 67810,
                        "endTime": 68230,
                        "data": "anh"
                    },
                    {
                        "startTime": 68230,
                        "endTime": 68610,
                        "data": "vẫn"
                    },
                    {
                        "startTime": 68610,
                        "endTime": 69010,
                        "data": "cố"
                    },
                    {
                        "startTime": 69010,
                        "endTime": 69010,
                        "data": "giấu"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 69010,
                        "endTime": 69420,
                        "data": "Giữ"
                    },
                    {
                        "startTime": 69420,
                        "endTime": 69810,
                        "data": "riêng"
                    },
                    {
                        "startTime": 69810,
                        "endTime": 70210,
                        "data": "anh"
                    },
                    {
                        "startTime": 70210,
                        "endTime": 70600,
                        "data": "nỗi"
                    },
                    {
                        "startTime": 70600,
                        "endTime": 71390,
                        "data": "sầu"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 71390,
                        "endTime": 71810,
                        "data": "Và"
                    },
                    {
                        "startTime": 71810,
                        "endTime": 71810,
                        "data": "gió"
                    },
                    {
                        "startTime": 71810,
                        "endTime": 72210,
                        "data": "đêm"
                    },
                    {
                        "startTime": 72210,
                        "endTime": 72600,
                        "data": "mây"
                    },
                    {
                        "startTime": 72600,
                        "endTime": 72600,
                        "data": "từ"
                    },
                    {
                        "startTime": 72600,
                        "endTime": 73000,
                        "data": "đâu"
                    },
                    {
                        "startTime": 73000,
                        "endTime": 73400,
                        "data": "đến"
                    },
                    {
                        "startTime": 73400,
                        "endTime": 73400,
                        "data": "đây"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 73400,
                        "endTime": 73820,
                        "data": "Mà"
                    },
                    {
                        "startTime": 73820,
                        "endTime": 74220,
                        "data": "khiến"
                    },
                    {
                        "startTime": 74220,
                        "endTime": 74620,
                        "data": "con"
                    },
                    {
                        "startTime": 74620,
                        "endTime": 74620,
                        "data": "tim"
                    },
                    {
                        "startTime": 74620,
                        "endTime": 75020,
                        "data": "mình"
                    },
                    {
                        "startTime": 75020,
                        "endTime": 75400,
                        "data": "đau"
                    },
                    {
                        "startTime": 75400,
                        "endTime": 75400,
                        "data": "đến"
                    },
                    {
                        "startTime": 75400,
                        "endTime": 75810,
                        "data": "vậy"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 75810,
                        "endTime": 76200,
                        "data": "Vì"
                    },
                    {
                        "startTime": 76200,
                        "endTime": 76200,
                        "data": "một"
                    },
                    {
                        "startTime": 76200,
                        "endTime": 76620,
                        "data": "người"
                    },
                    {
                        "startTime": 76620,
                        "endTime": 77000,
                        "data": "đã"
                    },
                    {
                        "startTime": 77000,
                        "endTime": 77410,
                        "data": "đến"
                    },
                    {
                        "startTime": 77410,
                        "endTime": 77410,
                        "data": "chiếm"
                    },
                    {
                        "startTime": 77410,
                        "endTime": 77790,
                        "data": "lấy"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 77790,
                        "endTime": 78190,
                        "data": "Những"
                    },
                    {
                        "startTime": 78190,
                        "endTime": 78190,
                        "data": "rung"
                    },
                    {
                        "startTime": 78190,
                        "endTime": 78610,
                        "data": "động"
                    },
                    {
                        "startTime": 78610,
                        "endTime": 78990,
                        "data": "về"
                    },
                    {
                        "startTime": 78990,
                        "endTime": 79790,
                        "data": "em"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 79790,
                        "endTime": 80590,
                        "data": "Nhìn"
                    },
                    {
                        "startTime": 80590,
                        "endTime": 80990,
                        "data": "bông"
                    },
                    {
                        "startTime": 80990,
                        "endTime": 80990,
                        "data": "lau"
                    },
                    {
                        "startTime": 80990,
                        "endTime": 81380,
                        "data": "nghiêng"
                    },
                    {
                        "startTime": 81380,
                        "endTime": 81780,
                        "data": "giống"
                    },
                    {
                        "startTime": 81780,
                        "endTime": 82170,
                        "data": "như"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 82170,
                        "endTime": 82590,
                        "data": "Lòng"
                    },
                    {
                        "startTime": 82590,
                        "endTime": 82590,
                        "data": "mình"
                    },
                    {
                        "startTime": 82590,
                        "endTime": 82980,
                        "data": "còn"
                    },
                    {
                        "startTime": 82980,
                        "endTime": 82980,
                        "data": "nhiều"
                    },
                    {
                        "startTime": 82980,
                        "endTime": 83380,
                        "data": "chơi"
                    },
                    {
                        "startTime": 83380,
                        "endTime": 84180,
                        "data": "vơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 84180,
                        "endTime": 84580,
                        "data": "Chiều"
                    },
                    {
                        "startTime": 84580,
                        "endTime": 84970,
                        "data": "mưa"
                    },
                    {
                        "startTime": 84970,
                        "endTime": 84970,
                        "data": "rơi"
                    },
                    {
                        "startTime": 84970,
                        "endTime": 85370,
                        "data": "không"
                    },
                    {
                        "startTime": 85370,
                        "endTime": 85760,
                        "data": "bến"
                    },
                    {
                        "startTime": 85760,
                        "endTime": 86170,
                        "data": "đợi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 86170,
                        "endTime": 86560,
                        "data": "Nhưng"
                    },
                    {
                        "startTime": 86560,
                        "endTime": 86960,
                        "data": "anh"
                    },
                    {
                        "startTime": 86960,
                        "endTime": 86960,
                        "data": "vẫn"
                    },
                    {
                        "startTime": 86960,
                        "endTime": 87370,
                        "data": "chờ"
                    },
                    {
                        "startTime": 87370,
                        "endTime": 87760,
                        "data": "em"
                    },
                    {
                        "startTime": 87760,
                        "endTime": 88160,
                        "data": "tới"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 88160,
                        "endTime": 88560,
                        "data": "Ngàn"
                    },
                    {
                        "startTime": 88560,
                        "endTime": 88950,
                        "data": "yêu"
                    },
                    {
                        "startTime": 88950,
                        "endTime": 89340,
                        "data": "thương"
                    },
                    {
                        "startTime": 89340,
                        "endTime": 89760,
                        "data": "sau"
                    },
                    {
                        "startTime": 89760,
                        "endTime": 90150,
                        "data": "cuối"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 90150,
                        "endTime": 90540,
                        "data": "Xin"
                    },
                    {
                        "startTime": 90540,
                        "endTime": 90940,
                        "data": "được"
                    },
                    {
                        "startTime": 90940,
                        "endTime": 90940,
                        "data": "là"
                    },
                    {
                        "startTime": 90940,
                        "endTime": 91350,
                        "data": "bầu"
                    },
                    {
                        "startTime": 91350,
                        "endTime": 91740,
                        "data": "trời"
                    },
                    {
                        "startTime": 91740,
                        "endTime": 92150,
                        "data": "em"
                    },
                    {
                        "startTime": 92150,
                        "endTime": 92540,
                        "data": "ơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 92540,
                        "endTime": 92930,
                        "data": "Yêu"
                    },
                    {
                        "startTime": 92930,
                        "endTime": 93340,
                        "data": "em"
                    },
                    {
                        "startTime": 93340,
                        "endTime": 93750,
                        "data": "không"
                    },
                    {
                        "startTime": 93750,
                        "endTime": 94140,
                        "data": "nghỉ"
                    },
                    {
                        "startTime": 94140,
                        "endTime": 94530,
                        "data": "ngơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 94530,
                        "endTime": 94930,
                        "data": "Gã"
                    },
                    {
                        "startTime": 94930,
                        "endTime": 94930,
                        "data": "si"
                    },
                    {
                        "startTime": 94930,
                        "endTime": 95340,
                        "data": "tình"
                    },
                    {
                        "startTime": 95340,
                        "endTime": 95720,
                        "data": "chỉ"
                    },
                    {
                        "startTime": 95720,
                        "endTime": 96130,
                        "data": "cần"
                    },
                    {
                        "startTime": 96130,
                        "endTime": 96520,
                        "data": "thế"
                    },
                    {
                        "startTime": 96520,
                        "endTime": 97720,
                        "data": "thôi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 97720,
                        "endTime": 98120,
                        "data": "Nhìn"
                    },
                    {
                        "startTime": 98120,
                        "endTime": 98530,
                        "data": "ngọn"
                    },
                    {
                        "startTime": 98530,
                        "endTime": 98920,
                        "data": "đèn"
                    },
                    {
                        "startTime": 98920,
                        "endTime": 98920,
                        "data": "mờ"
                    },
                    {
                        "startTime": 98920,
                        "endTime": 99320,
                        "data": "vội"
                    },
                    {
                        "startTime": 99320,
                        "endTime": 100120,
                        "data": "tắt"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 100120,
                        "endTime": 100520,
                        "data": "Mưa"
                    },
                    {
                        "startTime": 100520,
                        "endTime": 100900,
                        "data": "đánh"
                    },
                    {
                        "startTime": 100900,
                        "endTime": 100900,
                        "data": "rơi"
                    },
                    {
                        "startTime": 100900,
                        "endTime": 101310,
                        "data": "trong"
                    },
                    {
                        "startTime": 101310,
                        "endTime": 102110,
                        "data": "mắt"
                    },
                    {
                        "startTime": 102110,
                        "endTime": 102510,
                        "data": "anh"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 102510,
                        "endTime": 102900,
                        "data": "Tìm"
                    },
                    {
                        "startTime": 102900,
                        "endTime": 103300,
                        "data": "hình"
                    },
                    {
                        "startTime": 103300,
                        "endTime": 104090,
                        "data": "bóng"
                    },
                    {
                        "startTime": 104090,
                        "endTime": 104490,
                        "data": "của"
                    },
                    {
                        "startTime": 104490,
                        "endTime": 106490,
                        "data": "em"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 106490,
                        "endTime": 106890,
                        "data": "Và"
                    },
                    {
                        "startTime": 106890,
                        "endTime": 107290,
                        "data": "dòng"
                    },
                    {
                        "startTime": 107290,
                        "endTime": 107690,
                        "data": "đời"
                    },
                    {
                        "startTime": 107690,
                        "endTime": 107690,
                        "data": "nhiều"
                    },
                    {
                        "startTime": 107690,
                        "endTime": 108080,
                        "data": "mộng"
                    },
                    {
                        "startTime": 108080,
                        "endTime": 108870,
                        "data": "ước"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 108870,
                        "endTime": 108870,
                        "data": "Mong"
                    },
                    {
                        "startTime": 108870,
                        "endTime": 109290,
                        "data": "bên"
                    },
                    {
                        "startTime": 109290,
                        "endTime": 109660,
                        "data": "em"
                    },
                    {
                        "startTime": 109660,
                        "endTime": 110070,
                        "data": "sẽ"
                    },
                    {
                        "startTime": 110070,
                        "endTime": 110480,
                        "data": "mãi"
                    },
                    {
                        "startTime": 110480,
                        "endTime": 110860,
                        "data": "yên"
                    },
                    {
                        "startTime": 110860,
                        "endTime": 111700,
                        "data": "bình"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 111700,
                        "endTime": 112100,
                        "data": "Tuổi"
                    },
                    {
                        "startTime": 112100,
                        "endTime": 112480,
                        "data": "xuân"
                    },
                    {
                        "startTime": 112480,
                        "endTime": 112890,
                        "data": "đẹp"
                    },
                    {
                        "startTime": 112890,
                        "endTime": 112890,
                        "data": "như"
                    },
                    {
                        "startTime": 112890,
                        "endTime": 113680,
                        "data": "ánh"
                    },
                    {
                        "startTime": 113680,
                        "endTime": 116680,
                        "data": "trăng"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 131650,
                        "endTime": 132050,
                        "data": "Dưới"
                    },
                    {
                        "startTime": 132050,
                        "endTime": 132050,
                        "data": "cơn"
                    },
                    {
                        "startTime": 132050,
                        "endTime": 132430,
                        "data": "mưa"
                    },
                    {
                        "startTime": 132430,
                        "endTime": 132830,
                        "data": "chẳng"
                    },
                    {
                        "startTime": 132830,
                        "endTime": 132830,
                        "data": "ai"
                    },
                    {
                        "startTime": 132830,
                        "endTime": 133240,
                        "data": "đón"
                    },
                    {
                        "startTime": 133240,
                        "endTime": 133640,
                        "data": "đưa"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 133640,
                        "endTime": 133640,
                        "data": "Chỉ"
                    },
                    {
                        "startTime": 133640,
                        "endTime": 134030,
                        "data": "có"
                    },
                    {
                        "startTime": 134030,
                        "endTime": 134440,
                        "data": "anh"
                    },
                    {
                        "startTime": 134440,
                        "endTime": 134440,
                        "data": "luôn"
                    },
                    {
                        "startTime": 134440,
                        "endTime": 134840,
                        "data": "nhìn"
                    },
                    {
                        "startTime": 134840,
                        "endTime": 135240,
                        "data": "em"
                    },
                    {
                        "startTime": 135240,
                        "endTime": 135240,
                        "data": "dưới"
                    },
                    {
                        "startTime": 135240,
                        "endTime": 135640,
                        "data": "mưa"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 135640,
                        "endTime": 136030,
                        "data": "Lặng"
                    },
                    {
                        "startTime": 136030,
                        "endTime": 136420,
                        "data": "thầm"
                    },
                    {
                        "startTime": 136420,
                        "endTime": 136820,
                        "data": "chịu"
                    },
                    {
                        "startTime": 136820,
                        "endTime": 136820,
                        "data": "phải"
                    },
                    {
                        "startTime": 136820,
                        "endTime": 137230,
                        "data": "trái"
                    },
                    {
                        "startTime": 137230,
                        "endTime": 137610,
                        "data": "đắng"
                    },
                    {
                        "startTime": 137610,
                        "endTime": 138020,
                        "data": "nữa"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 138020,
                        "endTime": 138020,
                        "data": "Biết"
                    },
                    {
                        "startTime": 138020,
                        "endTime": 138420,
                        "data": "bao"
                    },
                    {
                        "startTime": 138420,
                        "endTime": 138820,
                        "data": "nhiêu"
                    },
                    {
                        "startTime": 138820,
                        "endTime": 139230,
                        "data": "mới"
                    },
                    {
                        "startTime": 139230,
                        "endTime": 140010,
                        "data": "vừa"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 140010,
                        "endTime": 140010,
                        "data": "Ngồi"
                    },
                    {
                        "startTime": 140010,
                        "endTime": 140430,
                        "data": "ngắm"
                    },
                    {
                        "startTime": 140430,
                        "endTime": 140840,
                        "data": "trông"
                    },
                    {
                        "startTime": 140840,
                        "endTime": 140840,
                        "data": "ai"
                    },
                    {
                        "startTime": 140840,
                        "endTime": 141240,
                        "data": "mà"
                    },
                    {
                        "startTime": 141240,
                        "endTime": 141630,
                        "data": "anh"
                    },
                    {
                        "startTime": 141630,
                        "endTime": 141630,
                        "data": "cứ"
                    },
                    {
                        "startTime": 141630,
                        "endTime": 142040,
                        "data": "mong"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 142040,
                        "endTime": 142430,
                        "data": "Thấy"
                    },
                    {
                        "startTime": 142430,
                        "endTime": 142820,
                        "data": "em"
                    },
                    {
                        "startTime": 142820,
                        "endTime": 142820,
                        "data": "buồn"
                    },
                    {
                        "startTime": 142820,
                        "endTime": 143220,
                        "data": "là"
                    },
                    {
                        "startTime": 143220,
                        "endTime": 143620,
                        "data": "đau"
                    },
                    {
                        "startTime": 143620,
                        "endTime": 144010,
                        "data": "xé"
                    },
                    {
                        "startTime": 144010,
                        "endTime": 144420,
                        "data": "lòng"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 144420,
                        "endTime": 144820,
                        "data": "Từng"
                    },
                    {
                        "startTime": 144820,
                        "endTime": 144820,
                        "data": "giọt"
                    },
                    {
                        "startTime": 144820,
                        "endTime": 145210,
                        "data": "lệ"
                    },
                    {
                        "startTime": 145210,
                        "endTime": 145610,
                        "data": "em"
                    },
                    {
                        "startTime": 145610,
                        "endTime": 145610,
                        "data": "vẫn"
                    },
                    {
                        "startTime": 145610,
                        "endTime": 146020,
                        "data": "cứ"
                    },
                    {
                        "startTime": 146020,
                        "endTime": 146410,
                        "data": "khóc"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 146410,
                        "endTime": 146810,
                        "data": "Cố"
                    },
                    {
                        "startTime": 146810,
                        "endTime": 146810,
                        "data": "nuốt"
                    },
                    {
                        "startTime": 146810,
                        "endTime": 147230,
                        "data": "ngược"
                    },
                    {
                        "startTime": 147230,
                        "endTime": 147600,
                        "data": "vào"
                    },
                    {
                        "startTime": 147600,
                        "endTime": 148410,
                        "data": "trong"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 148410,
                        "endTime": 148800,
                        "data": "Chạy"
                    },
                    {
                        "startTime": 148800,
                        "endTime": 149200,
                        "data": "theo"
                    },
                    {
                        "startTime": 149200,
                        "endTime": 149200,
                        "data": "chân"
                    },
                    {
                        "startTime": 149200,
                        "endTime": 149600,
                        "data": "cơn"
                    },
                    {
                        "startTime": 149600,
                        "endTime": 150010,
                        "data": "sóng"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 150010,
                        "endTime": 150390,
                        "data": "Đi"
                    },
                    {
                        "startTime": 150390,
                        "endTime": 150800,
                        "data": "tìm"
                    },
                    {
                        "startTime": 150800,
                        "endTime": 151200,
                        "data": "ai"
                    },
                    {
                        "startTime": 151200,
                        "endTime": 151200,
                        "data": "ở"
                    },
                    {
                        "startTime": 151200,
                        "endTime": 151590,
                        "data": "nơi"
                    },
                    {
                        "startTime": 151590,
                        "endTime": 151990,
                        "data": "xa"
                    },
                    {
                        "startTime": 151990,
                        "endTime": 152790,
                        "data": "xôi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 152790,
                        "endTime": 152790,
                        "data": "Trời"
                    },
                    {
                        "startTime": 152790,
                        "endTime": 153190,
                        "data": "hôm"
                    },
                    {
                        "startTime": 153190,
                        "endTime": 153580,
                        "data": "nay"
                    },
                    {
                        "startTime": 153580,
                        "endTime": 153980,
                        "data": "tắt"
                    },
                    {
                        "startTime": 153980,
                        "endTime": 154380,
                        "data": "nắng"
                    },
                    {
                        "startTime": 154380,
                        "endTime": 154790,
                        "data": "rồi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 154790,
                        "endTime": 155170,
                        "data": "Trong"
                    },
                    {
                        "startTime": 155170,
                        "endTime": 155170,
                        "data": "căn"
                    },
                    {
                        "startTime": 155170,
                        "endTime": 155580,
                        "data": "phòng"
                    },
                    {
                        "startTime": 155580,
                        "endTime": 155990,
                        "data": "tâm"
                    },
                    {
                        "startTime": 155990,
                        "endTime": 156760,
                        "data": "tối"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 156760,
                        "endTime": 157180,
                        "data": "Vì"
                    },
                    {
                        "startTime": 157180,
                        "endTime": 157580,
                        "data": "nghe"
                    },
                    {
                        "startTime": 157580,
                        "endTime": 157960,
                        "data": "câu"
                    },
                    {
                        "startTime": 157960,
                        "endTime": 158370,
                        "data": "nói"
                    },
                    {
                        "startTime": 158370,
                        "endTime": 158760,
                        "data": "dối"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 158760,
                        "endTime": 158760,
                        "data": "Nên"
                    },
                    {
                        "startTime": 158760,
                        "endTime": 159160,
                        "data": "lòng"
                    },
                    {
                        "startTime": 159160,
                        "endTime": 159560,
                        "data": "buồn"
                    },
                    {
                        "startTime": 159560,
                        "endTime": 159960,
                        "data": "làm"
                    },
                    {
                        "startTime": 159960,
                        "endTime": 159960,
                        "data": "gì"
                    },
                    {
                        "startTime": 159960,
                        "endTime": 160350,
                        "data": "em"
                    },
                    {
                        "startTime": 160350,
                        "endTime": 161160,
                        "data": "ơi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 161160,
                        "endTime": 161550,
                        "data": "Người"
                    },
                    {
                        "startTime": 161550,
                        "endTime": 161550,
                        "data": "thương"
                    },
                    {
                        "startTime": 161550,
                        "endTime": 161940,
                        "data": "em"
                    },
                    {
                        "startTime": 161940,
                        "endTime": 162350,
                        "data": "chính"
                    },
                    {
                        "startTime": 162350,
                        "endTime": 162750,
                        "data": "là"
                    },
                    {
                        "startTime": 162750,
                        "endTime": 162750,
                        "data": "tôi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 162750,
                        "endTime": 163140,
                        "data": "Gã"
                    },
                    {
                        "startTime": 163140,
                        "endTime": 163550,
                        "data": "si"
                    },
                    {
                        "startTime": 163550,
                        "endTime": 163940,
                        "data": "tình"
                    },
                    {
                        "startTime": 163940,
                        "endTime": 164340,
                        "data": "rồi"
                    },
                    {
                        "startTime": 164340,
                        "endTime": 164340,
                        "data": "lệ"
                    },
                    {
                        "startTime": 164340,
                        "endTime": 164750,
                        "data": "đắng"
                    },
                    {
                        "startTime": 164750,
                        "endTime": 167750,
                        "data": "môi"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 184250,
                        "endTime": 184660,
                        "data": "Nhìn"
                    },
                    {
                        "startTime": 184660,
                        "endTime": 184660,
                        "data": "ngọn"
                    },
                    {
                        "startTime": 184660,
                        "endTime": 185050,
                        "data": "đèn"
                    },
                    {
                        "startTime": 185050,
                        "endTime": 185050,
                        "data": "mờ"
                    },
                    {
                        "startTime": 185050,
                        "endTime": 185460,
                        "data": "vội"
                    },
                    {
                        "startTime": 185460,
                        "endTime": 185860,
                        "data": "tắt"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 185860,
                        "endTime": 185860,
                        "data": "Mưa"
                    },
                    {
                        "startTime": 185860,
                        "endTime": 186260,
                        "data": "đang"
                    },
                    {
                        "startTime": 186260,
                        "endTime": 186650,
                        "data": "rơi"
                    },
                    {
                        "startTime": 186650,
                        "endTime": 187040,
                        "data": "trong"
                    },
                    {
                        "startTime": 187040,
                        "endTime": 187440,
                        "data": "mắt"
                    },
                    {
                        "startTime": 187440,
                        "endTime": 188180,
                        "data": "anh"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 188180,
                        "endTime": 188970,
                        "data": "Tìm"
                    },
                    {
                        "startTime": 188970,
                        "endTime": 189380,
                        "data": "hình"
                    },
                    {
                        "startTime": 189380,
                        "endTime": 189770,
                        "data": "bóng"
                    },
                    {
                        "startTime": 189770,
                        "endTime": 190550,
                        "data": "của"
                    },
                    {
                        "startTime": 190550,
                        "endTime": 191360,
                        "data": "em"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 191360,
                        "endTime": 192160,
                        "data": "Và"
                    },
                    {
                        "startTime": 192160,
                        "endTime": 192560,
                        "data": "dòng"
                    },
                    {
                        "startTime": 192560,
                        "endTime": 192960,
                        "data": "đời"
                    },
                    {
                        "startTime": 192960,
                        "endTime": 193360,
                        "data": "nhiều"
                    },
                    {
                        "startTime": 193360,
                        "endTime": 193760,
                        "data": "mộng"
                    },
                    {
                        "startTime": 193760,
                        "endTime": 194150,
                        "data": "ước"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 194150,
                        "endTime": 194570,
                        "data": "Mong"
                    },
                    {
                        "startTime": 194570,
                        "endTime": 194950,
                        "data": "bên"
                    },
                    {
                        "startTime": 194950,
                        "endTime": 195350,
                        "data": "em"
                    },
                    {
                        "startTime": 195350,
                        "endTime": 195750,
                        "data": "sẽ"
                    },
                    {
                        "startTime": 195750,
                        "endTime": 196150,
                        "data": "mãi"
                    },
                    {
                        "startTime": 196150,
                        "endTime": 196540,
                        "data": "yên"
                    },
                    {
                        "startTime": 196540,
                        "endTime": 197360,
                        "data": "bình"
                    }
                ]
            },
            {
                "words": [
                    {
                        "startTime": 197360,
                        "endTime": 197770,
                        "data": "Tuổi"
                    },
                    {
                        "startTime": 197770,
                        "endTime": 198150,
                        "data": "xuân"
                    },
                    {
                        "startTime": 198150,
                        "endTime": 198560,
                        "data": "đẹp"
                    },
                    {
                        "startTime": 198560,
                        "endTime": 198560,
                        "data": "như"
                    },
                    {
                        "startTime": 198560,
                        "endTime": 199350,
                        "data": "ánh"
                    },
                    {
                        "startTime": 199350,
                        "endTime": 200350,
                        "data": "trăng"
                    }
                ]
            }
        ]`

  lyric = JSON.parse(lyric)

  const btnOpenKara = document.querySelector('.open-karaoke button')
  const btnCloseKara = document.querySelector('.close')
  const karaoke = document.querySelector('.karaoke')
  const karaokeInner = document.querySelector('.karaoke-inner')
  const karaokeContent = document.querySelector('.karaoke-content')

  var songInfo = `<p>Yêu vội vàng</p>
  <p>Ca sỹ: Lê Bảo Bình</p>`
  btnOpenKara.addEventListener('click', function() {
    karaoke.classList.add('show')
    karaokeContent.innerHTML = songInfo
  }) 
  btnCloseKara.addEventListener('click', function() {
    karaoke.classList.remove('show')
    karaokeContent.innerHTML = ""
  }) 

  function handleLyric(time) {
    var time = time * 1000
    var index = lyric.findIndex(function(item) {
      var sentences = item.words;
      return time >= sentences[0].startTime && time <= sentences[sentences.length - 1].endTime 
    })
    if (index !== -1) {
      karaokeContent.innerText = ""

      var page = Math.floor(index / 2 + 1)
      var offset = (page - 1) * 2
      var divEle = document.createElement('div')
        for (i = offset; i< offset + 2; i++) {
            var p = document.createElement('p')
            lyric[i].words.forEach(function(word) {
                var wordEle = document.createElement('span')
                wordEle.classList.add('word')
                wordEle.innerText = word.data+ " "
                var spanEle = document.createElement('span')
                spanEle.innerText = word.data
                wordEle.append(spanEle)
                p.appendChild(wordEle)
            })
            divEle.append(p)
        }
        karaokeContent.append(divEle)
    } else {
      karaokeContent.innerHTML = songInfo
    }
  }