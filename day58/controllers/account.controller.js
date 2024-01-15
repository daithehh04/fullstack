const bcrypt = require("bcrypt");
const model = require("../models/index");
const moment = require("moment")
const { validationResult } = require("express-validator");
const validate = require("../utils/validate");
const { Op } = require("sequelize");
const User = model.User;
const Device = model.Device;

module.exports = {
  edit: async (req,res,next) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      const errorsEdit = req.flash("errorsEdit");
      const body = req.flash("body");
      const exist = req.flash("exist");
      res.render("account/edit", { user, validate, body, errors:errorsEdit,exist });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res) => {
    const result = validationResult(req);
    const { id } = req.params;
    const body = req.body;
    if (result.isEmpty()) {
      const userExist = await User.findOne({ where: { email: body.email, id: { [Op.ne]: id }, } });
      if (userExist) {
        req.flash("body", req.body);
        req.flash("exist", "Email đã tồn tại!");
        return res.redirect(`/account/edit/${id}`);
      }
      const status = await User.update(body, {
        where: { id },
      });
      const user = await User.findOne({
        where: { id },
      });
      req.session.user = user;
      req.flash('success', 'Cập nhật thông tin thành công!')
      return res.redirect("/");
    }
    req.flash("body", body);
    req.flash("errorsEdit", result.errors);
    return res.redirect(`/account/edit/${id}`);
  },
  password: async (req, res) => {
    const body = req.flash("body");
    const errors = req.flash("errors")
    const wrong = req.flash("wrong")
    const wrongRe = req.flash("wrongRe")
    res.render("account/password", {
      body:body[0],errors,wrong,wrongRe,validate
    });
  },
  handlePassword: async (req, res) => {
    const { id } = req.params;
    const { passwordOld, passwordNew, rePasswordNew } = req.body
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    const result = validationResult(req);

    if (result.isEmpty()) {
      if (!passwordOld) {
        req.flash("body", req.body);
        req.flash("wrong", 'Vui lòng nhập trường này');
        return res.redirect(`/account/password/${id}`);
      }
      const isMatch = await bcrypt.compare(passwordOld, user.password);
      if (!isMatch) {
        req.flash("body", req.body);
        req.flash("wrong", 'Mật khẩu không chính xác');
        return res.redirect(`/account/password/${id}`);
      }
      if (passwordNew !== rePasswordNew) {
        req.flash("body", req.body);
        req.flash("wrongRe", 'Mật khẩu không chính xác');
        return res.redirect(`/account/password/${id}`);
      }
      const hashPassword = await bcrypt.hash(passwordNew, 10)
      const status = await User.update({password:hashPassword}, {
        where: { id },
      });
      req.flash('success', 'Đổi mật khẩu thành công!')
      const userToken = req.cookies.userToken
      const device = await Device.findOne({ where: { token: userToken }, attributes: ['id'] })
      const idDevice = device.id
      await Device.update(
        { status: false },
        { where: { user_id: id, id: { [Op.ne]: idDevice } } }
      );
      return res.redirect("/");
    }
    req.flash("body", req.body);
    req.flash("errors", result.errors);
    return res.redirect(`/account/password/${id}`);
  },
  device: async (req, res) => {
    const {id} = req.params 
    const devices = await Device.findAll({
      where: { user_id: id },
    });
    return res.render("account/device", {devices, moment})
  },
  handleDevice: async (req, res) => {
    const { id } = req.params;
    await Device.update(
      { status: false },
      {where: {id}}
    )
    return res.redirect("/");
  }
}