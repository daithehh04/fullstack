const { ShortLink } = require("../models/index")
const QRCode = require("qrcode")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { handleDate } = require("../utils/date")
module.exports = {
  index: async (req, res) => {
    const err = req.flash("err")
    const errID = req.flash("errID")
    const success = req.flash("success")
    const urls = await ShortLink.findAll({
      order: [["created_at", "desc"]],
    })
    res.render("shorten_urls/index", { err, errID, urls, handleDate, success })
  },
  handleShortUrl: async (req, res) => {
    let { url, password, safe, id_custom } = req.body
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    const checkUrl = url.match(regex)
    if (id_custom.length > 15) {
      req.flash("errID", "ID quá dài!")
      return res.redirect("/shorten-urls")
    }
    if (checkUrl === null) {
      req.flash("err", "Vui lòng nhập đúng url!")
      return res.redirect("/shorten-urls")
    }
    if (!id_custom) {
      id_custom = crypto.randomBytes(4).toString("hex")
    }
    const urlExist = await ShortLink.findOne({ where: { link_id: id_custom } })
    if (urlExist) {
      req.flash("errID", "ID đã tồn tại!")
      return res.redirect("/shorten-urls")
    }
    const hashPass = await bcrypt.hash(password, 10)
    await ShortLink.create({
      link_origin: url,
      link_short: `https://day61.vercel.app/shorten-urls/${id_custom}`,
      link_id: id_custom,
      password: password ? hashPass : null,
      number_access: 0,
      safe_redirect: !!+safe,
    })
    req.flash("success", "Rút gọn thành công!")
    res.redirect("/shorten-urls")
  },
  handleDetailUrl: async (req, res, next) => {
    const { id } = req.params
    const urlExist = await ShortLink.findOne({ where: { link_id: id } })
    if (!urlExist) {
      return next(new Error("Url không tồn tại!"))
    }
    if (!urlExist.safe_redirect) {
      await ShortLink.update(
        { number_access: urlExist.number_access + 1 },
        { where: { link_id: id } }
      )
      return res.redirect(urlExist.link_origin)
    }
    const checkPassword = urlExist.password
    if (checkPassword) {
      return res.render("shorten_urls/checkPassword", {
        errPass: [],
        layout: false,
      })
    }

    const urlImg = await QRCode.toDataURL(urlExist.link_origin)
    await ShortLink.update(
      { number_access: urlExist.number_access + 1 },
      { where: { link_id: id } }
    )
    return res.render("shorten_urls/url", {
      layout: false,
      url: urlExist.link_origin,
      urlImg,
    })
  },
  handleCheckPassword: async (req, res, next) => {
    const { id } = req.params
    const urlExist = await ShortLink.findOne({ where: { link_id: id } })
    if (!urlExist) {
      return next(new Error("Url không tồn tại!"))
    }
    const isMatch = await bcrypt.compare(req.body.password, urlExist.password)
    if (isMatch) {
      const urlImg = await QRCode.toDataURL(urlExist.link_origin)
      await ShortLink.update(
        { number_access: urlExist.number_access + 1 },
        { where: { link_id: id } }
      )
      return res.render("shorten_urls/url", {
        layout: false,
        url: urlExist.link_origin,
        urlImg,
      })
    }
    return res.render("shorten_urls/checkPassword", {
      errPass: ["Mật khẩu không chính xác!"],
      layout: false,
    })
  },
  delete: async (req, res) => {
    const { id } = req.params
    await ShortLink.destroy({ where: { link_id: id } })
    return res.redirect("/shorten-urls")
  },
}
