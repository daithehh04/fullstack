const { validationResult } = require("express-validator")
const model = require("../models/index")
const moment = require("moment")
const validate = require("../utils/validate")
const sendMail = require("../utils/mail")
const Email = model.Email

module.exports = {
  index: async (req, res) => {
    const errors = req.flash("errors")
    return res.render("sendmail/index", {
      errors,
      validate,
    })
  },
  handleSendmail: async (req, res, next) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      const { email, title, content } = req.body
      try {
        const mail = await Email.create({ title, content, mail_to: email })
        if (mail) {
          const info = await sendMail(email, title, content, mail.id)
          req.flash("ok", "Send mail success!")
        }
        return res.redirect("/")
      } catch (error) {
        next(error)
      }
    }
    req.flash("errors", result.errors)
    return res.redirect("/send-mail")
  },
  history: async (req, res) => {
    let { page = 1 } = req.query
    if (!+page) {
      page = 1
    }
    const limit = 3
    const offset = (page - 1) * limit
    let { rows: mails, count } = await Email.findAndCountAll({
      order: [["time_send", "desc"]],
      limit,
      offset,
    })
    const totalPage = Math.ceil(count / limit)
    return res.render("sendmail/history", { mails, moment, page, totalPage })
  },
  mailDetail: async (req, res) => {
    const { id } = req.params
    const email = await Email.findByPk(id)
    return res.render("sendmail/detail", { email, moment })
  },

  handleTracking: async (req, res) => {
    const { id } = req.params
    await Email.update(
      { status: true },
      {
        where: { id },
      }
    )
    res.json()
  },
}
