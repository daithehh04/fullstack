const GoogleStrategy = require("passport-google-oauth20").Strategy
const { User } = require("../models/index")

module.exports = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://day60-ten.vercel.app/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    const { name, email } = profile._json
    const [user, created] = await User.findOrCreate({
      where: { provider: "google", email },
      defaults: {
        fullname: name,
        email,
        provider: "google",
      },
    })
    return cb(null, user)
  }
)
