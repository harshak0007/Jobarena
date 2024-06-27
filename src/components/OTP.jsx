import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { useNavbar } from '@/context/NavbarContext';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
import { setLanguage } from '@/Feature/LanguageSlice'


import OtpInput from 'otp-input-react';

import { useState } from 'react';



const OTP = () => {
	const { i18n, t } = useTranslation();
	const dispatch = useDispatch();
	// const language = useSelector((state) => state.language)
	const { setShowOTP, handleVerifyOtpEmail, handleVerifyOtpPhone, otpType, selectedLanguage, handleVerifyOtpEmailLogin, handleVerifyOtpPhoneLogin, setSelectedLanguage, setTheme, themeMap } = useNavbar();

	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);



	const handleVerifyOtp = async () => {
		try {
			setLoading(true)
			console.log(otpType)
			let result;
			if (otpType === 'email') {
				result = await handleVerifyOtpEmail(otp);
			}
			else if (otpType === 'emailLogin') {
				result = await handleVerifyOtpEmailLogin(otp);
			}
			else if (otpType === 'phoneLogin') {
				result = await handleVerifyOtpPhoneLogin(otp);
			}
			else {
				result = await handleVerifyOtpPhone(otp)
			}
			console.log(result)
			if (result) {
				i18n.changeLanguage(selectedLanguage);
				localStorage.setItem("lang", selectedLanguage)
				dispatch(setLanguage(selectedLanguage))
				setTheme(themeMap[selectedLanguage])



			}
			setSelectedLanguage(localStorage.getItem('lang'))

		} catch (error) {
			console.error("Error verifying OTP: ", error);
		}
	}

	return (
		<div className='absolute top-0 left-0 bg-black/60 w-full h-full z-50'>
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-full mx-auto min-h-96 shadow-lg px-4 py-6 rounded-md z-50  bg-[--grey]'>
				<button
					aria-label='close login modal'
					className='text-3xl ml-auto block mb-4 -mt-6 -mr-2 text-[--primary-text] hover:text-black p-2 '
					onClick={() => setShowOTP(false)}>
					&times;
				</button>

				<div className='bg-white text-[--button-background-color-border] w-fit mx-auto p-4 rounded-full'>
					<BsFillShieldLockFill size={30} />
				</div>
				<div className="flex flex-col items-center my-5 gap-2">
					<label
						htmlFor='otp'
						className='font-bold text-xl  text-[--text-color-dark] text-center mb-4'>
						{t("Enter your OTP")}
					</label>
					<OtpInput
						value={otp}
						onChange={setOtp}
						OTPLength={6}
						otpType='number'
						disabled={false}
						autoFocus

					></OtpInput>
				</div>

				<button
					onClick={() => { handleVerifyOtp() }}
					className=' bg-[--button-background-color-hover] hover:bg-[--grey] w-full flex mt-8 gap-1 items-center justify-center py-2.5 text-white hover:text-[--text-color-dark] font-semibold rounded border border-[--button-background-color-border]'>
					{loading && (
						<CgSpinner
							size={20}
							className='mt-1 animate-spin'
						/>
					)}
					<span>{t("Verify OTP")}</span>
				</button>

			</div>
		</div >
	);
};

export default OTP;
