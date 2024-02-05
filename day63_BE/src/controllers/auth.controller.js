const { SuccessResponse, CREATED } = require("../core/success.response")
const AuthService = require("../services/auth.service")

class AuthController {
  handlerRefreshToken = async (req, res) => {
    new SuccessResponse({
      message: "Get token Success!",
      metadata: await AuthService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res)
  }
  static login = async (req, res) => {
    new SuccessResponse({
      message: "Login Success!",
      metadata: await AuthService.login(req.body),
    }).send(res)
  }

  static signUp = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AuthService.signUp(req.body),
    }).send(res)
  }

  static logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success!",
      metadata: await AuthService.logout(),
    }).send(res)
  }
}

module.exports = AuthController
