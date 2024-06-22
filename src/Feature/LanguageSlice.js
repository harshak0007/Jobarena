import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

const getCurrentLanguage = () => {
	const storedLanguage = localStorage.getItem('lang');
	return storedLanguage || i18n.language || 'en'; // Fallback to 'en' if language is not set
};
const languageSlice = createSlice({
	name: 'language',
	initialState: getCurrentLanguage(), // Default language
	reducers: {
		setLanguage: (state, action) => {
			return action.payload; // Set the state to the new language
		},
	},
});

// Export the actions
export const { setLanguage } = languageSlice.actions;

// Export the reducer
export default languageSlice.reducer;
