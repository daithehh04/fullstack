var express = require("express")
const redisController = require("../controllers/redis.controller")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

// router.put("/v1/redis", redisController.setRedis)
// router.post("/v1/redis", redisController.getRedis)

module.exports = router
