const client = require("../dbs/init.redis")

module.exports = {
  setRedis: async ({ key, value }) => {
    try {
      return new Promise((isOkay, isError) => {
        client.set(key, value, (err, rs) => {
          return !err ? isOkay(rs) : isError(err)
        })
      })
    } catch (error) {}
  },
  getRedis: async (key) => {
    try {
      return new Promise((isOkay, isError) => {
        client.get(key, (err, rs) => {
          return !err ? isOkay(rs) : isError(err)
        })
      })
    } catch (error) {}
  },
}
