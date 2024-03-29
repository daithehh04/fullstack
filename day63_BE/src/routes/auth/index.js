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
    failureRedirect: "/signin/auth",
    scope: ["profile", "email"],
    failureFlash: true,
  }),
  (req, res) => {
    res.cookie("access_token", `google~${req.user.accessToken}`, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: true,
    })
    res.redirect(`http://localhost:3000/`)
  }
)

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
)

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/signin",
    scope: ["profile", "email"],
  }),
  function (req, res) {
    res.cookie("access_token", `github~${req.user.accessToken}`, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: true,
    })
    // Successful authentication, redirect home.
    res.redirect(`https://dashb-fe.vercel.app`)
  }
)
module.exports = router
