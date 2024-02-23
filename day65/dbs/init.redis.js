const Redis = require("ioredis")

const client = new Redis({
  host: "redis-15047.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 15047,
  password: "Er6RuFIQm29zPSKJoKpdE4Mw7HYqXCRF",
})
client.on("connect", () => console.log("Redis Client connect success"))
client.on("error", (err) => console.log("Redis Client Error", err))

module.exports = client
