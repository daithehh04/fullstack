var express = require("express");
var router = express.Router();
const homeController = require("../controllers/home.controller");
const validate = require("../utils/validate");

/* GET home page. */
router.get("/", homeController.index);
router.get("/login", homeController.login);
router.post("/login", validate.login(), homeController.handleLogin);

router.get("/register", homeController.register);
router.post("/register", validate.register(), homeController.handleRegister);
router.get("/logout", homeController.logout);

module.exports = router;
