import { createSlice } from '@reduxjs/toolkit';

export const JobDataSlice = createSlice({
	name: 'jobData',
	initialState: [],
	reducers: {
		setJobData: (state, action) => {
			console.log(action.payload);
			return action.payload;
		},
	},
});
export const { setJobData } = JobDataSlice.actions;
export default JobDataSlice.reducer;
