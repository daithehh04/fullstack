const moment = require("moment")
const bcrypt = require("bcrypt")
const model = require("../models/index")
const { Op } = require("sequelize")
const { Phone, Course, Post, User, Role } = model
module.exports = {
  index: async (req, res) => {
    const filters = {}
    const { keyword, status } = req.query
    if (status === "active" || status === "inactive") {
      filters.status = status === "active"
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
      ]
    }
    let { page = 1 } = req.query
    if (!+page) {
      page = 1
    }
    const limit = 3
    const offset = (page - 1) * limit
    let { rows: users, count } = await User.findAndCountAll({
      order: [["id", "desc"]],
      where: filters,
      limit,
      offset,
      include: {
        model: Phone,
        as: "phone",
      },
    })
    const totalPage = Math.ceil(count / limit)
    const success = req.flash("success")
    res.render("user/index", { users, moment, page, totalPage, success })
  },
  add: async (req, res) => {
    const msg = req.flash("msg")
    const exist = req.flash("exist")
    const old = req.flash("old")
    const courses = await Course.findAll({
      order: [["name", "asc"]],
    })
    res.render("user/add", {
      msg,
      exist,
      old: old[0],
      courses,
    })
  },
  handleAdd: async (req, res) => {
    const { name, email, password, status } = req.body
    const courses = Array.from(req.body.courses)
    console.log("courses", courses)
    const userExist = await User.findOne({ where: { email } })
    if (userExist === null) {
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        try {
          const user = await User.create({
            fullname: name,
            email,
            password: hash,
            status: status === "active",
          })
          if (user && courses.length) {
            for (let courseId of courses) {
              const course = await Course.findByPk(courseId)
              if (course) {
                await user.addCourse(course)
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      })
      req.flash("msg", "Đăng kí thành công")
      return res.redirect("/users/add")
    } else {
      req.flash("old", req.body)
      req.flash("exist", "Email đã tồn tại!")
      return res.redirect("/users/add")
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params
    try {
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: Post,
            as: "posts",
          },
          {
            model: Course,
            as: "courses",
          },
        ],
      })
      console.log(user)
      if (!user) {
        throw new Error("Người dùng không tồn tại")
      }
      const courses = await Course.findAll({
        order: [["name", "asc"]],
      })
      res.render("user/edit", { user, courses })
    } catch (e) {
      return next(e)
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params
    const body = req.body
    body.status = body.status === "active"
    const status = await User.update(body, {
      where: { id },
    })
    const courses = Array.from(req.body.courses)
    if (courses.length) {
      const courseList = await Promise.all(
        courses.map((courseId) => Course.findByPk(courseId))
      )
      const user = await User.findByPk(id)
      await user.setCourses(courseList)
    }
    return res.redirect("/users")
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      await User.destroy({
        where: { id },
        force: true,
      })
    } catch (error) {
      console.log(id)
    }
    return res.redirect("/users")
  },
  permission: async (req, res) => {
    const { id } = req.params
    const roles = await Role.findAll()
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "roles",
        },
      ],
    })
    return res.render("user/permission", { roles, userRole: user.roles })
  },
  handlePermission: async (req, res) => {
    const { id } = req.params
    let listRoleId = req.body.role
    if (!listRoleId) {
      listRoleId = []
    }
    if (!Array.isArray(listRoleId)) {
      listRoleId = [listRoleId]
    }
    const listRole = await Promise.all(listRoleId.map((r) => Role.findByPk(r)))
    const user = await User.findByPk(id)
    user.setRoles(listRole)
    req.flash("success", "Phân quyền thành công!")
    return res.redirect("/users")
  },
}
