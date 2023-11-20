import { client } from "../utils/clientUtils";

export const getProducts = async ({params}) => {
  return await client.get("/products",params);
};

export const getProductDetail = async({id}) => {
  return await client.get(`/products/${id}`)
}