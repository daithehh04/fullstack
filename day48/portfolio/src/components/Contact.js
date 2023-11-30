function Contact({data}) {
  return (
    <div className="border mb-8 border-solid border-[#ccc] p-4 rounded-lg shadow-medium">
      <h3 className="heading">{data.title}</h3>
      <ul>
        <li>Phone: <a href="tel:0397647002" class="text-danger">0397647002</a></li>
        <li>Zalo: <a href="https://chat.zalo.me/" class="text-danger" target="_blank">https://zalo.me</a></li>
        <li>Email: <a href="mailto:daithehh04@gmail.com" class="text-danger">daithehh04@gmail.com</a></li>
        <li>Linkedin: <a href="https://www.linkedin.com/in/th%E1%BA%BF-nguy%E1%BB%85n-%C4%91%E1%BA%A1i-719683265/" class="text-danger" target="_blank">https://www.linkedin.com/in/thế-nguyễn-đại-719683265/</a></li>
      </ul>
    </div>
  )
}

export default Contact