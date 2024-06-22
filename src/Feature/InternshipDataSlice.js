import { createSlice } from '@reduxjs/toolkit';
// export const setInternshipData = (state, action) => {
// 	state.push(action.payload);
// };
export const InternshipDataSlice = createSlice({
	name: 'InternshipData',
	initialState: [],
	reducers: {
		setInternshipData: (state, action) => {
			console.log(action.payload);
			return action.payload;
		},
	},
});
export const { setInternshipData } = InternshipDataSlice.actions;
export default InternshipDataSlice.reducer;
