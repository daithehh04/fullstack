import { client } from "../config/client";
export default async function getProfile() {
  const apiKey = localStorage.getItem("apiKey")
  try {
    const { data, response } = await client.get('/users/profile',{},apiKey);
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}

