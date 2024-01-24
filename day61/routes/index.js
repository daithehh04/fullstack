var express = require("express")
var router = express.Router()
const sendmailController = require("../controllers/sendmail.controller")
const validate = require("../utils/validate")

/* GET home page. */
router.get("/", function (req, res, next) {
  const ok = req.flash("ok")
  res.render("index", { ok, req })
})

module.exports = router
