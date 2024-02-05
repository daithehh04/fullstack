const { keyToken } = require("../models/index")
class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    const tokens = await keyToken.create({
      user_id: userId,
      public_key: publicKey,
      private_key: privateKey,
      refresh_token: refreshToken,
      refresh_tokens_used: [],
    })
    return tokens ? tokens.public_key : null
  }
  static findByUserId = async (userId) => {
    return await keyToken.findOne({ where: { user_id: userId } })
  }
  static removeKeyById = async (id) => {
    return await keyToken.destroy({
      where: { user_id: id },
    })
  }
}

module.exports = KeyTokenService
