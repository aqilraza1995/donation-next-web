import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardApi, getDonationChartDataApi } from "../api/dashboard";

export const getDashboard = createAsyncThunk("/dashboard/count", async (_, { rejectWithValue }) => {
  try {
    const res = await getDashboardApi()
    return res?.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getDonationChartData = createAsyncThunk("/dashboard/chartData", async (days, { rejectWithValue }) => {
  try {
    const res = await getDonationChartDataApi(days)
    return res?.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


const initialState = {
  dashboard: {},
  loading: false,
  error: null
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard?.pending, (state) => {
        state.loading = true
      })
      .addCase(getDashboard?.fulfilled, (state, action) => {
        state.loading = false
        state.dashboard = action?.payload
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(getDonationChartData?.pending, (state) => {
        state.loading = true
      })
      .addCase(getDonationChartData?.fulfilled, (state, action) => {
        state.loading = false
        state.dashboard.donationChartData = action?.payload?.data
      })
      .addCase(getDonationChartData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default dashboardSlice.reducer