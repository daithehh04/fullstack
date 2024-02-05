require("dotenv").config()
const compression = require("compression")
const express = require("express")
const { default: helmet } = require("helmet")
const morgan = require("morgan")
const passport = require("passport")
const passportGoogle = require("../src/passports/passport.google")
const passportGithub = require("../src/passports/passport.github")
const { User } = require("./models/index")
const session = require("express-session")
const cors = require("cors")
const app = express()

app.use(cors())

// init middleware
app.use(morgan("dev")) // log lỗi trực quan hơn
app.use(helmet()) // bảo vệ thông tin dự án
app.use(compression()) // giảm dung lượng file được gửi đi
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: "daithe_secret",
    resave: false,
    saveUninitialized: true,
  })
)

// ========= Passport =========
app.use(passport.initialize())
app.use(passport.session())
passport.use(passportGoogle)
passport.use(passportGithub)

passport.serializeUser(function (user, done) {
  done(null, user.user.id)
})

passport.deserializeUser(async function (id, done) {
  // Đọc user từ db theo id
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (error) {
    console.log(error)
  }
})

// init router
app.use("/", require("./routes"))

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found!")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    // stack: error.stack,
    message: error.message || "Internal Error Server",
  })
})
module.exports = app
