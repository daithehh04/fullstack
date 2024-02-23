const { NotFoundError } = require("../core/error.response")
const { User } = require("../models/index")
class UserService {
  static async getProfileUser({ email, provider }) {
    const user = await User.findOne({
      where: { email, provider },
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      throw new NotFoundError("User không tồn tại!")
    }
    return user
  }
  static async getAllUser({ page, limit }) {
    const options = {
      order: [["id", "desc"]],
      attributes: { exclude: ["password"] },
    }
    if (!+page || page < 0) {
      page = 1
    }
    if (limit && Number.isInteger(+limit)) {
      options.limit = limit
      const offset = (page - 1) * limit
      options.offset = offset
    }
    const { rows: users, count } = await User.findAndCountAll(options)
    return {
      users,
      count,
    }
  }

  static async getUserById({ id }) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
    if (!user) {
      throw new NotFoundError("User không tồn tại!")
    }
    return user
  }

  static async updateUserById({ id, name }) {
    await User.update({ fullname: name }, { where: { id } })
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
    return user
  }

  static async deleteUserById({ id }) {
    const user = await User.destroy({ where: { id } })
    return user
  }

  static async deleteUsers({ ids }) {
    const user = await User.destroy({
      where: {
        id: ids,
      },
    })
    return user
  }

  static async getUserByEmail({ email }) {
    const user = await User.findOne({ where: { email, provider: null } })
    if (!user) {
      throw new NotFoundError("User không tồn tại!")
    }
    return user
  }
}

module.exports = UserService
