import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Feature/Userslice';
import internshipDataReducer from '../Feature/InternshipDataSlice';
import jobDataReducer from '../Feature/JobDataSlice';
import languageSlice from '../Feature/LanguageSlice';
export const store = configureStore({
	reducer: {
		user: userReducer,
		internshipData: internshipDataReducer,
		jobData: jobDataReducer,
		language: languageSlice,
	},
});
