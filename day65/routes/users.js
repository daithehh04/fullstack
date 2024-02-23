var express = require("express")
const { getAllUser, getDetailUser } = require("../controllers/user.controller")
var router = express.Router()

/* GET users listing. */
router.get("/", getAllUser)
router.get("/:id", getDetailUser)

module.exports = router
