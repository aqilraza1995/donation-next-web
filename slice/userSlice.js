import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserAPI } from "../api/user";


export const getUsers = createAsyncThunk("/user", async (_, { rejectWithValue }) => {
  try {
    const res = await getUserAPI()
    return res?.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

const initialState = {
  loading: false,
  users: [],
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //get User list
      .addCase(getUsers?.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUsers?.fulfilled, (state, action) => {
        state.loading = false
        state.users = action?.payload?.data
      })
      .addCase(getUsers?.rejected, (state, action) => {
        state.loading = false
        state.error = action?.payload
      })
  }
})

export default userSlice?.reducer