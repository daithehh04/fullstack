/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getProductDetail, getProducts } from "../../services/productService"
import { toast } from "react-toastify"

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
   async (params) => {
    try {
      const {data} = await getProducts({params})
      return data.data
    } catch (error) {
      toast.error('Error !')
      throw error;
    }
  }
)

export const fetchProductDetail = createAsyncThunk(
  'fetchProductDetail',
   async (id) => {
    try {
      const {data} = await getProductDetail({id})
    return data.data
    } catch (error) {
      toast.error('Error !')
      console.log(error);
      throw error
    }
  }
)
