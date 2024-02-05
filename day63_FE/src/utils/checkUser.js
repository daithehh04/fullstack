import {
  getUserFromEmail,
  getUserFromToken,
  getUserFromTokenGithub,
} from "@/services/user.service"
import { cookies } from "next/headers"

export const checkUser = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("access_token")
  const access_token = accessToken?.value.split("~")[1]
  const provider = accessToken?.value.split("~")[0]
  let user = null
  let email = null
  if (provider === "google") {
    user = await getUserFromToken(access_token)
    email = user?.email
  }
  if (provider === "github") {
    user = await getUserFromTokenGithub(access_token)
    email = `${user?.name}@gmail.com`
  }
  const response = await getUserFromEmail({
    email,
    provider,
  })
  const infoUser = response?.metadata
  return infoUser
}
