"use strict"
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "daithehh04@gmail.com",
    pass: "kxfw zbgw cmne ulol",
  },
})

const sendMail = async (to, subject, message, id) => {
  const info = await transporter.sendMail({
    from: '"Dai The 👻" <daithehh04@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: `${message} <img src="localhost:3000/tracking-pixel/${id}" alt="" />`, // html body
  })
  return info
}
module.exports = sendMail
