var express = require("express")
var router = express.Router()
const sendmailController = require("../controllers/sendmail.controller")
const validate = require("../utils/validate")

/* GET home page. */
router.get("/", function (req, res, next) {
  const ok = req.flash("ok")
  res.render("index", { title: "Express", ok })
})

router.get("/send-mail", sendmailController.index)
router.get("/history", sendmailController.history)
router.get("/tracking-pixel/:id", sendmailController.handleTracking)

router.post("/mail/:id", sendmailController.mailDetail)

router.post(
  "/send-mail",
  validate.sendmail(),
  sendmailController.handleSendmail
)

module.exports = router
