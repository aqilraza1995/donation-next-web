import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createDonationAPI, getuserDonationsAPI } from "../api/donation";


export const createDonation = createAsyncThunk("donation/createDonation", async (data, { rejectWithValue }) => {
	try {
		const response = await createDonationAPI({amount: data});
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
})

export const getUserDonations = createAsyncThunk("donation/getUserDonations", async (_, { rejectWithValue }) => {
	try {
		const response = await getuserDonationsAPI();
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});


const initialState = {
	loading: false,
	donationData: [],
	error: null,
}

const donationSlice = createSlice({
	name:"donation",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

		// Create Donation
			.addCase(createDonation.pending, (state) => {
				state.loading = true;
			})
			.addCase(createDonation.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createDonation.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

				// Get User Donations
			.addCase(getUserDonations.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserDonations.fulfilled, (state, action) => {
				state.loading = false;
				state.donationData = action.payload;
			})
			.addCase(getUserDonations.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
	}
})

export default donationSlice.reducer
		