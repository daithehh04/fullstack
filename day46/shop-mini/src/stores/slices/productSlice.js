/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit'
import {fetchProductDetail, fetchProducts} from '../middlewares/productMiddleware'

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  statusProduct:'idle',
  products: [],
  totalPage: 0,
  productDetail: null,
  statusProductDetail: 'idle'
}

export const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state,action) => {
      const existProductItem = state.cart?.find((product) => product._id === action.payload._id)
      if (existProductItem) {
        existProductItem.amount+= 1
        existProductItem.quantity-=1
      } else {
        const newProduct = { ...action.payload, amount: 1 };
        state.cart.push(newProduct)
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrease: (state,action) => {
      const existProductItem = state.cart?.find((product) => product._id === action.payload._id)
      if (existProductItem.amount > 1) {
        existProductItem.amount -= 1
        existProductItem.quantity+=1
     } else {
       state.cart = state.cart.filter((product) => product._id !== action.payload._id)
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    remove: (state,action) => {
      const existProductItem = state.cart?.find((product) => product._id === action.payload._id)
      existProductItem.quantity+=existProductItem.amount
      state.cart = state.cart.filter((product) => product._id !== action.payload._id)
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    delete_cart: (state,action) => {
      localStorage.removeItem("cart");
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.statusProduct = 'pending'
    })
    builder.addCase(fetchProducts.fulfilled, (state,action) => {
      state.products = action.payload.listProduct
      state.totalPage = action.payload.totalPage
      state.statusProduct = 'success'
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.statusProduct = 'error'
    })
    
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.statusProductDetail = 'pending'
    })
    builder.addCase(fetchProductDetail.fulfilled, (state,action) => {
      state.productDetail = action.payload
      state.statusProductDetail = 'success'
    })
    builder.addCase(fetchProductDetail.rejected, (state) => {
      state.statusProductDetail = 'error'
    })
  }
})

export const { add,remove,decrease, delete_cart } = productSlice.actions