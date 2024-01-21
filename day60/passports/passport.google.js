const GoogleStrategy = require("passport-google-oauth20").Strategy
const { User } = require("../models/index")

module.exports = new GoogleStrategy(
  {
    clientID:
      "283236165929-ktpc9istus4cqbieq0mvgs3218btilev.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
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
