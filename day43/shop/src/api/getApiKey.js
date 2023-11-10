import { client } from "../config/client";

export default async function getApiKey(email) {
  try {
    const { data, response } = await client.get('/api-key', {email});
    if (response.ok) {
      return data;
    } 
  } catch (e) {
    throw new Error(e.message)
  }
}

