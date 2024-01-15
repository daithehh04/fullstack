const model = require("../models/index");
const { Device } = model
const checkLogin = async (req, res, next) => {
  const token = req.cookies.userToken
  if (token) {
    const device = await Device.findOne({ where: { token }, attributes: ['status'] })
    if (device.status) {
      return next()
    }
    return res.redirect('/login')
  } else {
    return res.redirect('/login')
  }
}
module.exports = {
  checkLogin
}