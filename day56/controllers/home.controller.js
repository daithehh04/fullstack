const bcrypt = require("bcrypt");
const model = require("../models/index");
const { validationResult } = require("express-validator");
const validate = require("../utils/validate");
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const user = req.session.user;
    const login = req.session.login;
    if (login) {
      return res.render("index", { user });
    }
    return res.redirect("/login");
  },
  login: async (req, res) => {
    const msg = req.flash("msg");
    const errors = req.flash("errorsLogin");
    const wrong = req.flash("wrong");
    const oldLogin = req.flash("oldLogin");
    const login = req.session.login;
    if (!login) {
      return res.render("login/index", {
        msg,
        errors,
        validate,
        wrong,
        old: oldLogin[0],
      });
    } else {
      return res.redirect("/");
    }
  },
  handleLogin: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          req.session.login = true;
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
    const login = req.session.login;
    if (!login) {
      return res.render("register/index", {
        errors,
        msg,
        validate,
        exist,
        old: old[0],
      });
    } else {
      return res.redirect("/");
    }
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
    req.session.login = false;
    res.redirect("/login");
  },
};
