const searchBox = document.querySelector(".search-box");
const btn = document.querySelector(".btn");
const action = document.querySelector(".action");
const result = document.createElement("div");
result.className = "result";

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "vi-VN";
  recognition.continuous = false;

  btn.addEventListener('click', () => {
    recognition.start();
    btn.textContent = 'Listening...';
    action.innerHTML = "Hãy nói nội dung bạn muốn nói";
    result.remove()
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.replace('.','');
    action.innerHTML = "Đã nói xong. Hy vọng kết quả như ý của bạn";
    result.innerText = `Đang thực hiện: ${transcript}`;
    searchBox.append(result);
    setTimeout(() => {
      if (handleVoice(transcript) === "Không thực hiện được yêu cầu") {
        result.innerText = `Không thực hiện được`;
      } else {
        result.innerText = `Đã thực hiện thành công`;
      }
    }, 1000);
  };

  recognition.onend = () => {
      btn.textContent = 'Bấm vào đây để nói';
  };
  const handleVoice = (text) => {
    const txt = text.toLowerCase().trim()
    if (txt === "google") {
      window.open("https://google.com");
    } else if (txt === "facebook") {
      window.open("https://facebook.com");
    } else if (txt === "youtube") {
      window.open("https://youtube.com");
    } else if (txt === "google drive") {
      window.open("https://drive.google.com");
    } else if (txt === "google maps") {
      window.open("https://maps.google.com");
    } else if (
      txt.includes("chỉ đường") ||
      txt.includes("chỉ đường tới") ||
      txt.includes("đường tới") ||
      txt.includes("tới")
    ) {
      const params = txt
        .replace("chỉ đường", "")
        .replace("chỉ đường tới", "")
        .replace("đi", "")
        .replace("tới", "")
        .trim();
      window.open(`https://www.google.com/maps/search/${params}`);
    } else if (
      txt.includes("bài hát") ||
      txt.includes("mở bài hát") ||
      txt.includes("nghe bài hát")
    ) {
      const params = txt
        .replace("bài hát", "")
        .replace("mở bài hát", "")
        .replace("nghe bài hát", "")
        .trim();
      window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${params}`);
    } else if (
      txt.includes("video") ||
      txt.includes("mở video") ||
      txt.includes("xem video")
    ) {
      const params = txt
      .replace("xem", "")
      .replace("video", "")
      .trim();
      window.open(`https://www.youtube.com/results?search_query=${params}`);
    } else {
      return "Không thực hiện được yêu cầu"
    }
  }
}
