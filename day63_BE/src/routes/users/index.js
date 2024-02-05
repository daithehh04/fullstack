"use strict"

const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const userController = require("../../controllers/user.controller")
// const { authentication } = require("../../auth/authUtils")
const router = express.Router()

// router.use(authMiddleware)
router.get("/", asyncHandler(userController.getAllUser))
router.get("/:id", asyncHandler(userController.getUserById))

router.post("/profile", asyncHandler(userController.getProfileUser))
// router.use(authentication)

router.patch("/:id", asyncHandler(userController.updateUserById))
router.delete("/:id", asyncHandler(userController.deleteUserById))
router.post("/delete", asyncHandler(userController.deleteUsers))
module.exports = router
