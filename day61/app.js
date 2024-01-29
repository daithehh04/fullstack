require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const passport = require("passport")
const passportLocal = require("./passports/passport.local")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var expressLayouts = require("express-ejs-layouts")
const { User } = require("./models/index")
var app = express()
// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

var flash = require("connect-flash")
var session = require("express-session")
const authMiddleware = require("./middleware/auth.middleware")
const guessMiddleware = require("./middleware/guess.middleware")
const passportGoogle = require("./passports/passport.google")
app.use(flash())
app.use(
  session({
    secret: "daithe secret",
    resave: false,
    saveUninitialized: true,
  })
)

// ========= Passport =========
app.use(passport.initialize())
app.use(passport.session())
passport.use("local", passportLocal)
passport.use(passportGoogle)

passport.serializeUser(function (user, done) {
  done(null, user.id)
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

app.use("/auth", guessMiddleware, require("./routes/auth"))
app.use(authMiddleware)
app.use("/shorten-urls", require("./routes/shorten-urls"))
app.use("/roles", require("./routes/roles"))
app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
