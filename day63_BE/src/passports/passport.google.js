const GoogleStrategy = require("passport-google-oauth20").Strategy
const { User } = require("../models/index")

module.exports = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:3056/v1/api/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    const { name, email } = profile._json
    const [user, created] = await User.findOrCreate({
      where: { provider: "google", email },
      defaults: {
        fullname: name,
        email,
        provider: "google",
        status: true,
      },
    })
    return cb(null, { user, accessToken })
  }
)
