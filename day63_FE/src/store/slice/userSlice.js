import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "../middleware/user.middleware"

const initialState = {
  userInfo: null,
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
  },
})

export const { setUserInfo } = userSlice.actions
