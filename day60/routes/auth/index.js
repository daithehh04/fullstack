var express = require("express")
var router = express.Router()
const authController = require("../../controllers/auth.controller")
const passport = require("passport")
const validate = require("../../utils/validate")

/* GET users listing. */
router.get("/login", authController.login)
router.get("/register", authController.register)
router.post("/register", validate.register(), authController.handleRegister)
router.get("/logout", (req, res) => {
  req.logout((err) => {})
  return res.redirect("/auth/login")
})
router.get("/forgot-password", authController.forgotPassword)
router.post("/forgot-password", authController.handleForgotPassword)
router.get("/reset-password/:id", authController.resetPassword)
router.post(
  "/reset-password/:id",
  validate.resetPassword(),
  authController.handleResetPassword
)
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/",
  })
)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/",
  })
)

module.exports = router
