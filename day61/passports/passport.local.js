const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { User } = require("../models/index")

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await User.findOne({ where: { email, provider: null } })
    if (!user) {
      return done(null, false, { message: "Tài khoản không tồn tại!" })
    }
    if (user.provider) {
      return done(null, user)
    }
    const passwordHash = user.password
    const isMatch = bcrypt.compareSync(password, passwordHash)
    if (!isMatch) {
      return done(null, false, {
        message: "Tài khoản hoặc mật khẩu không đúng!",
      })
    }
    done(null, user)
  }
)
