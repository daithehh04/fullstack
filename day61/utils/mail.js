"use strict"
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const sendMail = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: '"Dai The 👻" <daithehh04@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: `<div>Link xác nhận: ${message}</div>
      <i>Lưu ý link chỉ có hiệu lực trong vòng 15 phút kể từ khi bạn nhận được email này!</i>
    `, // html body
  })
  return info
}
module.exports = sendMail
