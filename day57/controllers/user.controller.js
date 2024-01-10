const moment = require("moment");
const bcrypt = require("bcrypt");
const model = require("../models/index");
const { Op } = require("sequelize");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const filters = {};
    const { keyword, status } = req.query;
    if (status === "active" || status === "inactive") {
      filters.status = status === "active";
    }
    if (keyword) {
      filters[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ];
    }
    let { page = 1 } = req.query;
    if (!+page) {
      page = 1;
    }
    const limit = 3;
    const offset = (page - 1) * limit;
    const { rows: users, count } = await User.findAndCountAll({
      order: [["id", "desc"]],
      where: filters,
      limit,
      offset,
    });
    const totalPage = Math.ceil(count / limit);
    res.render("user/index", { users, moment, page, totalPage });
  },
  add: async (req, res) => {
    const msg = req.flash("msg");
    const exist = req.flash("exist");
    const old = req.flash("old");
    res.render("user/add", {
      msg,
      exist,
      old: old[0],
    });
  },
  handleAdd: async (req, res) => {
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
      return res.redirect("/users/add");
    } else {
      req.flash("old", req.body);
      req.flash("exist", "Email đã tồn tại!");
      return res.redirect("/users/add");
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      res.render("user/edit", { user });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    body.status = body.status === "active";
    try {
      const status = await User.update(body, {
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
    res.send("ok");
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await User.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(id);
    }
    return res.redirect("/users");
  },
};
