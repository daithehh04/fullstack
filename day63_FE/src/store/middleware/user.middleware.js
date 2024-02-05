const { getDetailUser } = require("@/services/user.service")
const { createAsyncThunk } = require("@reduxjs/toolkit")

export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
  const response = await getDetailUser(id)
  return response.metadata
})
