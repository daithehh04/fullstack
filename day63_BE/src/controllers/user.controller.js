"use strict"
const { SuccessResponse } = require("../core/success.response")
const userService = require("../services/user.service")
class UserController {
  static getAllUser = async (req, res) => {
    new SuccessResponse({
      message: "Get all users success!",
      metadata: await userService.getAllUser(req.query),
    }).send(res)
  }
  static getUserById = async (req, res) => {
    new SuccessResponse({
      message: "Get user success!",
      metadata: await userService.getUserById(req.params),
    }).send(res)
  }

  static updateUserById = async (req, res) => {
    new SuccessResponse({
      message: "Update user success!",
      metadata: await userService.updateUserById({
        id: req.params.id,
        name: req.body.name,
      }),
    }).send(res)
  }

  static deleteUserById = async (req, res) => {
    new SuccessResponse({
      message: "Deleted user success!",
      metadata: await userService.deleteUserById(req.params),
    }).send(res)
  }

  static deleteUsers = async (req, res) => {
    new SuccessResponse({
      message: "Deleted user success!",
      metadata: await userService.deleteUsers(req.body),
    }).send(res)
  }

  static getProfileUser = async (req, res) => {
    new SuccessResponse({
      message: "Get profile user success!",
      metadata: await userService.getProfileUser(req.body),
    }).send(res)
  }
}

module.exports = UserController
