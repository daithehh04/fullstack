import { client } from "../config/client";

export default async function getProducts() {
  try {
    const { data, response } = await client.get('/products?limit=8');
    if (response.ok) {
      return data.data;
    } else {
      return "Đã có lỗi xảy ra. Vui lòng thử lại!";
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

