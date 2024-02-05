"use server"

import { revalidateTag } from "next/cache"

const api = process.env.NEXT_PUBLIC_API
export const getDetailUser = async (id) => {
  try {
    const user = await fetch(`${api}/users/${id}`, {
      cache: "no-cache",
    })
    return await user.json()
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (id, body) => {
  try {
    const res = await fetch(`${api}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    revalidateTag("collection")
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${api}/users/${id}`, {
      method: "DELETE",
    })
    revalidateTag("collection")
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteAllUser = async (body) => {
  try {
    const res = await fetch(`${api}/users/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    revalidateTag("collection")
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getUserFromToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const userInfo = await response.json()
    return userInfo
  } catch (error) {
    console.error(error)
  }
}

export const getUserFromTokenGithub = async (accessToken) => {
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (response) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
  }
}
export const getUserFromEmail = async (body) => {
  try {
    const res = await fetch(`${api}/users/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
