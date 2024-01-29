var express = require("express")
const shortenUrlsController = require("../../controllers/shortenUrls.controller")
var router = express.Router()

router.get("/", shortenUrlsController.index)
router.post("/", shortenUrlsController.handleShortUrl)

router.get("/:id", shortenUrlsController.handleDetailUrl)
router.post("/:id", shortenUrlsController.handleCheckPassword)
router.post("/delete/:id", shortenUrlsController.delete)

module.exports = router
