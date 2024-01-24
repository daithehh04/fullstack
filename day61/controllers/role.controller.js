const { Role, Permission, User } = require("../models/index")

module.exports = {
  index: async (req, res) => {
    const roles = await Role.findAll({
      order: [["id", "desc"]],
    })
    const success = req.flash("success")
    res.render("roles/index", { roles, success })
  },
  add: async (req, res) => {
    const errName = req.flash("errName")
    res.render("roles/add", { errName })
  },
  handleAdd: async (req, res) => {
    let { name, permission } = req.body
    if (!name) {
      req.flash("errName", "Vui lòng nhập trường này!")
      return res.redirect("/roles/add")
    }
    const role = await Role.findOne({
      where: { name },
    })
    if (role) {
      req.flash("errName", "Role đã tồn tại!")
      return res.redirect("/roles/add")
    }
    const newRole = await Role.create({
      name,
    })
    if (!permission) {
      permission = []
      req.flash("success", "Thêm role thành công!")
      return res.redirect("/roles")
    }

    if (!Array.isArray(permission)) {
      permission = [permission]
    }

    const permissions = permission

    for (const permission of permissions) {
      let permissionName = await Permission.findOne({
        where: { value: permission },
      })
      if (!permissionName) {
        permissionName = await Permission.create({
          value: permission,
        })
      }
      await newRole.addPermission(permissionName)
    }
    req.flash("success", "Thêm role thành công!")
    return res.redirect("/roles")
  },
  edit: async (req, res) => {
    const { id } = req.params
    const role = await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          as: "permissions",
        },
      ],
    })
    const roles = await Role.findAll({ order: [["name", "asc"]] })
    res.render("roles/edit", {
      permissions: role.permissions,
      name: role.name,
      roles,
      id,
    })
  },
  handleEdit: async (req, res) => {
    let { name, permission } = req.body
    const { id } = req.params
    const role = await Role.findByPk(id)
    if (!role) {
      console.log(`Role with id ${id} not found.`)
      return
    }
    if (!permission) {
      await role.setPermissions([])
      req.flash("success", "Cập nhật role thành công!")
      return res.redirect("/roles")
    }
    if (!Array.isArray(permission)) {
      permission = [permission]
    }
    const permissions = permission
    await Role.update(
      { name },
      {
        where: { id },
      }
    )
    const permissionList = await Promise.all(
      permissions.map((p) => Permission.findOne({ where: { value: p } }))
    )
    await role.setPermissions(permissionList)
    req.flash("success", "Cập nhật role thành công!")
    return res.redirect("/roles")
  },
  handleDelete: async (req, res) => {
    const { id } = req.params
    const role = await Role.findByPk(id)
    if (!role) {
      console.log(`Role with id ${id} not found.`)
      return
    }
    await role.setPermissions([])
    const usersWithRole = await role.getUsers()
    if (usersWithRole.length) {
      for (const user of usersWithRole) {
        await user.removeRole(id)
      }
    }
    const del = await role.destroy()
    console.log("role delete::", del)
    req.flash("success", "Xóa role thành công!")
    return res.redirect("/roles")
  },
}
