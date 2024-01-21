const sendMail = require("../utils/mail")
const validate = require("../utils/validate")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const { User } = require("../models/index")
const { validationResult } = require("express-validator")

module.exports = {
  login: (req, res) => {
    const ok = req.flash("ok")
    const error = req.flash("error")
    res.render("auth/login", { error, ok })
  },
  forgotPassword: async (req, res) => {
    const err = req.flash("error")
    const ok = req.flash("ok")
    const notify = req.flash("notify")
    res.render("auth/forgot_password", { err, ok, notify })
  },
  handleForgotPassword: async (req, res) => {
    const { email } = req.body
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.toLowerCase().match(regexEmail)) {
      req.flash("error", "Vui lòng nhập đúng định dạng email")
      return res.redirect("/auth/forgot-password")
    }
    const user = await User.findOne({
      where: {
        email,
        provider: null,
      },
    })

    if (!user) {
      req.flash(
        "notify",
        "Tìm kiếm không trả về kết quả nào. Vui lòng thử lại với thông tin khác."
      )
      return res.redirect("/auth/forgot-password")
    }

    const idReset = uuidv4()
    const currentTime = new Date()
    await User.update(
      {
        id_reset: idReset,
        expired_at: new Date(currentTime.getTime() + 1 * 60 * 1000),
      },
      {
        where: {
          email,
          provider: null,
        },
      }
    )
    const resetLink = `https://day60-ten.vercel.app/auth/reset-password/${idReset}`
    let loading = false
    try {
      loading = true
      const info = await sendMail(email, "Email xác nhận", resetLink)
    } catch (error) {
      console.log(error)
    } finally {
      loading = false
    }
    req.flash("ok", "Gửi mail thành công, Vui lòng check email để xác nhận!")
    return res.redirect("/auth/forgot-password")
  },
  resetPassword: async (req, res) => {
    const errors = req.flash("errors")
    const exactly = req.flash("exactly")
    const user = await User.findOne({
      where: { id_reset: req.params.id },
    })
    if (!user) {
      return res.render("auth/404", { expired: false })
    }
    const timeExpired = user.expired_at - new Date()
    if (timeExpired < 0) {
      return res.render("auth/404", { expired: true })
    }
    return res.render("auth/reset_password", {
      errors,
      validate,
      exactly,
    })
  },
  handleResetPassword: async (req, res) => {
    const result = validationResult(req)
    const { id } = req.params
    if (result.isEmpty()) {
      const { password, rePassword } = req.body
      if (password !== rePassword) {
        req.flash("exactly", "Mật khẩu không khớp!")
        return res.redirect(`/auth/reset-password/${id}`)
      }
      const user = await User.findOne({
        where: { id_reset: id },
      })
      if (!user) {
        return res.render("auth/404", { expired: false })
      }
      const timeExpired = user.expired_at - new Date()
      if (timeExpired < 0) {
        return res.render("auth/404", { expired: true })
      }
      const hashPassword = bcrypt.hashSync(password, 10)

      await User.update(
        {
          password: hashPassword,
        },
        { where: { id_reset: id } }
      )
      req.flash("ok", "Đổi mật khẩu thành công!")
      return res.redirect(`/auth/login`)
    }
    req.flash("errors", result.errors)
    return res.redirect(`/auth/reset-password/${id}`)
  },
  register: async (req, res) => {
    const errors = req.flash("errors")
    const wrong = req.flash("wrong")
    const old = req.flash("old")
    return res.render("auth/register", {
      errors,
      wrong,
      validate,
      old: old[0],
    })
  },
  handleRegister: async (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      const { name, email, password, rePassword } = req.body
      if (password !== rePassword) {
        req.flash("old", req.body)
        req.flash("wrong", "Mật khẩu không khớp")
        return res.redirect("/auth/register")
      }
      const hashPassword = bcrypt.hashSync(password, 10)
      await User.create({
        fullname: name,
        email,
        password: hashPassword,
        status: true,
      })
      req.flash("ok", "Đăng kí thành công")
      return res.redirect("/auth/login")
    }
    req.flash("old", req.body)
    req.flash("errors", result.errors)
    req.flash("msg", "Đăng kí thất bại")
    return res.redirect("/auth/register")
  },
}
