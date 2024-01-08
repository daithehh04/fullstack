var express = require("express");
var router = express.Router();
const homeController = require("../controllers/home.controller");
const authController = require("../controllers/auth.controller");
const validate = require("../utils/validate");

/* GET home page. */
router.get("/", homeController.index);
router.get("/login", authController.login);
router.post("/login", validate.login(), authController.handleLogin);

router.get("/register", authController.register);
router.post("/register", validate.register(), authController.handleRegister);
router.get("/logout", authController.logout);

module.exports = router;
