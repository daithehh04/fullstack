const { BadRequestError, AuthFailureError } = require("../core/error.response")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const { User, keyToken } = require("../models/index")
const { createTokenPair } = require("../auth/authUtils")
const KeyTokenService = require("./keyToken.service")
const { getUserByEmail } = require("./user.service")
class AuthService {
  static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { user_id: userId, email } = user
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.removeKeyById(userId)
      throw new ForbiddenError("Something wrong happen !! Pls reLogin")
    }
    if (keyStore.refreshToken !== refreshToken)
      throw new AuthFailureError("Account not register!")
    const foundUser = await getUserByEmail({ email })
    if (!foundUser) throw new AuthFailureError("Account not register!")
    // create 1 cặp mới
    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    )
    await keyToken.update(
      {
        refreshToken: tokens.refreshToken,
        refreshTokensUsed: literal(
          `array_append("refreshTokensUsed", '${refreshToken}')`
        ),
      },
      {
        where: {
          user_id: userId,
        },
      }
    )
    return {
      user,
      tokens,
    }
  }
  static login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, provider: null } })
    if (!user) throw new BadRequestError("Not found user!")

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new AuthFailureError("Authentication Error")

    const privateKey = crypto.randomBytes(64).toString("hex")
    const publicKey = crypto.randomBytes(64).toString("hex")

    const { id: userId } = user
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    )
    await KeyTokenService.createKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      publicKey,
      privateKey,
    })
    return {
      user,
      tokens,
    }
  }

  static signUp = async ({ name, email, password }) => {
    // check email exists?
    const user = await User.findOne({ where: { email, provider: null } })
    if (user) {
      throw new BadRequestError("Error: Account already registered!")
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      fullname: name,
      email,
      password: passwordHash,
    })
    if (newUser) {
      // create privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString("hex")
      const publicKey = crypto.randomBytes(64).toString("hex")
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser.user_id,
        publicKey,
        privateKey,
      })
      if (!keyStore) {
        throw new BadRequestError("Error: KeyStore error!")
      }
      // created token pair
      const tokens = await createTokenPair(
        { userId: newUser.user_id, email },
        publicKey,
        privateKey
      )
      return {
        user: newUser,
        tokens,
      }
    }
    return null
  }

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore.user_id)
    return delKey
  }
}

module.exports = AuthService
