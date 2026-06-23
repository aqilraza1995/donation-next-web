import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginAPI, logoutAPI, registerAPI } from "../api/auth";

export const register = createAsyncThunk("/auth/register", async (data, { rejectWithValue }) => {
  try {

    const response = await registerAPI(data)
    return response?.data

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
})

export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
  try {

    const response = await loginAPI(data)
    return response?.data

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
})

export const logout = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await logoutAPI()
    return response?.data
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || "Logout Failed")
  }
})

const initialState = {
  loggedUser: {},
  loading: false,
  isAuthenticated: false,
  authChecked: false,
  error: null
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })

      //Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true
        state.loggedUser = action?.payload?.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })

      //Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false
        state.loggedUser = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })

  }
})

export default authSlice.reducer