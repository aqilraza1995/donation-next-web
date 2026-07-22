import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserAPI, getUserByIdAPI } from "../api/user";


export const getUsers = createAsyncThunk("/user", async (params, { rejectWithValue }) => {
  try {
    const res = await getUserAPI(params)
    return res?.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getUserById = createAsyncThunk("/getUserById", async (id, { rejectWithValue }) => {
  try {
    const res = await getUserByIdAPI(id)
    return res?.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

const initialState = {
  loading: false,
  users: [],
  selectedUser: {},
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
        console.log("action?.payload :", action?.payload)
        state.users = action?.payload
      })
      .addCase(getUsers?.rejected, (state, action) => {
        state.loading = false
        state.error = action?.payload
      })

      //get User by id
      .addCase(getUserById?.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserById?.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUser = action?.payload
      })
      .addCase(getUserById?.rejected, (state, action) => {
        state.loading = false
        state.error = action?.payload
      })
  }
})

export default userSlice?.reducer