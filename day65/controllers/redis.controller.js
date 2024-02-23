const { setRedis, getRedis } = require("../services/redis.service")

module.exports = {
  setRedis: async (req, res, next) => {
    try {
      const { key, payload } = req.body
      return res.json({
        data: await setRedis({
          key,
          value: JSON.stringify(payload),
        }),
      })
    } catch (error) {
      next(error)
    }
  },
  getRedis: async (req, res, next) => {
    try {
      const { key } = req.body
      return res.json({
        data: JSON.parse(await getRedis(key)),
      })
    } catch (error) {
      next(error)
    }
  },
}
