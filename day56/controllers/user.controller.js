const moment = require("moment");
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
    const users = await User.findAll({
      order: [["id", "desc"]],
      where: filters,
    });
    res.render("user/index", { users, moment });
  },
  add: async (req, res) => {
    res.render("user/add");
  },
  handleAdd: async (req, res) => {
    console.log(req.body);
    res.send("submit");
  },
  edit: async (req, res) => {
    res.render("user/edit");
  },
  handleEdit: async (req, res) => {},
  delete: async (req, res) => {
    res.send("ok");
  },
};
