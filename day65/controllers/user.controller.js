const { getAllUser, getDetailUser } = require("../services/user.service")

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      return res.status(200).json({
        message: "get all user success!",
        data: await getAllUser(),
      })
    } catch (error) {
      next(error)
    }
  },
  getDetailUser: async (req, res, next) => {
    try {
      const { id } = req.params
      return res.status(200).json({
        message: "get user success!",
        data: await getDetailUser(id),
      })
    } catch (error) {}
  },
}
