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

const sendMail = async (to, subject, message, id) => {
  console.log("process.env.MAIL_USER", process.env.MAIL_USER)
  const info = await transporter.sendMail({
    from: "Dai The 👻", // sender address
    to,
    subject, // Subject line
    html: `${message} <img src="https://day59-chi.vercel.app/tracking-pixel/${id}" alt="" />`, // html body
  })
  return info
}
module.exports = sendMail
