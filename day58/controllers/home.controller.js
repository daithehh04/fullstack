const bcrypt = require("bcrypt");
const crypto = require("crypto");
const moment = require('moment');
const model = require("../models/index");
const UAParser = require('ua-parser-js');
const { validationResult } = require("express-validator");
const validate = require("../utils/validate");
const User = model.User;
const Device = model.Device;
const parser = new UAParser();
module.exports = {
  index: async (req, res) => {
    const userToken = req.cookies.userToken
    const success = req.flash("success");
    if (userToken) {
      const device = await Device.findOne({ where: { token: userToken }, attributes: ['user_id', 'status'] })
      if (!device.status) {
        return res.redirect("/login");
      }
      const user = await User.findByPk(device?.user_id)
      return res.render("index", { user, success });
    }
    return res.redirect("/login");
  },
  login: async (req, res) => {
    const msg = req.flash("msg");
    const errors = req.flash("errorsLogin");
    const wrong = req.flash("wrong");
    const oldLogin = req.flash("oldLogin");
    const userToken = req.cookies.userToken
    if (userToken) {
      const device = await Device.findOne({ where: { token: userToken }, attributes: ['status'] })
      if (!device?.status) {
        return res.render("login/index", {
          msg,
          errors,
          validate,
          wrong,
          old: oldLogin[0],
        });
      }
      return res.redirect("/")
    }
    return res.render("login/index", {
      msg,
      errors,
      validate,
      wrong,
      old: oldLogin[0],
    });
  },
  handleLogin: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { email, password } = req.body;
      const result = parser.setUA(req.headers["user-agent"]).getResult()
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = crypto.randomBytes(64).toString('hex')
          console.log(user.id);
          const device = await Device.create({
            name: result.os.name,
            browser: result.browser.name,
            token,
            user_id: user.id,
            login_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            last_active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
          const oneYear = 365 * 24 * 60 * 60 * 1000;
          res.cookie('userToken', token, { maxAge: oneYear, httpOnly: true });
          req.session.user = user;
          return res.redirect("/");
        } else {
          req.flash("oldLogin", req.body);
          req.flash("wrong", "Tên đăng nhập hoặc mật khẩu không đúng!");
          return res.redirect("/login");
        }
      } else {
        req.flash("oldLogin", req.body);
        req.flash("wrong", "Tên đăng nhập hoặc mật khẩu không đúng!");
        return res.redirect("/login");
      }
    }
    req.flash("oldLogin", req.body);
    req.flash("errorsLogin", result.errors);
    return res.redirect("/login");
  },
  register: async (req, res) => {
    const errors = req.flash("errors");
    const msg = req.flash("msg");
    const exist = req.flash("exist");
    const old = req.flash("old");
    const userToken = req.cookies.userToken
    if (userToken) {
      const device = await Device.findOne({ where: { token: userToken }, attributes: ['status'] })
      if (!device.status) {
        return res.render("register/index", {
          errors,
          msg,
          validate,
          exist,
          old: old[0],
        });
      }
      return res.redirect("/");
    }
    return res.render("register/index", {
      errors,
      msg,
      validate,
      exist,
      old: old[0],
    });
  },
  handleRegister: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { name, email, password, status } = req.body;
      const userExist = await User.findOne({ where: { email } });
      if (userExist === null) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          try {
            await User.create({
              name,
              email,
              password: hash,
              status: status === "active",
            });
          } catch (error) {
            console.log(error);
          }
        });
        req.flash("msg", "Đăng kí thành công");
        return res.redirect("/login");
      } else {
        req.flash("old", req.body);
        req.flash("exist", "Email đã tồn tại!");
        return res.redirect("/register");
      }
    }
    req.flash("old", req.body);
    req.flash("errors", result.errors);
    req.flash("msg", "Đăng kí thất bại");
    return res.redirect("/register");
  },
  logout: async (req, res) => {
    res.clearCookie('userToken');
    const token = req.cookies.userToken
    await Device.update(
      {
      status: false,
      },
      {
        where: {token}
      }
    )
    res.redirect("/login");
  },
};
