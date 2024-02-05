const GitHubStrategy = require("passport-github").Strategy
const { User } = require("../models/index")

module.exports = new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: "http://localhost:3056/v1/api/auth/github/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    let { name, email } = profile._json
    if (!email) {
      email = `${name}@gmail.com`
    }
    const [user, created] = await User.findOrCreate({
      where: { provider: "github", email },
      defaults: {
        fullname: name,
        email,
        provider: "github",
        status: true,
      },
    })
    return cb(null, { user, accessToken })
  }
)
