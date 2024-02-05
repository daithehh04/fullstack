"use strict"
const passport = require("passport")
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const authController = require("../../controllers/auth.controller")
const { authentication } = require("../../auth/authUtils")
const router = express.Router()

router.post("/signup", asyncHandler(authController.signUp))
router.post("/login", asyncHandler(authController.login))
// router.use(authentication)
router.post("/logout", asyncHandler(authController.logout))
router.post(
  "/handlerRefreshToken",
  asyncHandler(authController.handlerRefreshToken)
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
  }),
  (req, res) => {
    res.cookie("access_token", `google~${req.user.accessToken}`, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    })
    res.redirect(`http://localhost:3000`)
  }
)

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
)

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.cookie("access_token", `github~${req.user.accessToken}`, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    })
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:3000`)
  }
)
module.exports = router
