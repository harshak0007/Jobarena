
import { useNavbar } from '@/context/NavbarContext';
// import { BsTelephoneFill } from 'react-icons/bs';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
// import { MdErrorOutline } from 'react-icons/md';
import { handleGoogleLogin, } from '../utils/api';
// import { useNavigate } from 'react-router-dom';




const LoginPhone = () => {
	const { setShowLogin, setShowLoginPhone, t, handleSendOtpPhoneLogin } = useNavbar();
	// const navigate = useNavigate()
	const [ph, setPh] = useState('');
	const initiateGoogleLogin = async () => {
		try {
			await handleGoogleLogin();
		} catch (error) {
			console.error("Google login failed:", error);
		}
	};

	const onSubmit = async (e) => {

		try {
			e.preventDefault()
			handleSendOtpPhoneLogin(ph)

		} catch (error) {
			console.error('Error logging in:', error);
		}
	};
	return (
		<div className='absolute top-0 left-0 bg-black/60 w-full h-full z-50'>
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm  w-[90%]  lg:w-full mx-auto min-h-96 shadow-lg px-4 py-6 rounded-md bg-white z-50 '>
				<button
					aria-label='close login modal'
					className='text-2xl lg:text-3xl ml-auto block mb-4 -mt-6 -mr-2 text-[--primary-text] hover:text-black p-2 '
					onClick={() => setShowLoginPhone(false)}>
					&times;
				</button>
				<button className='flex items-center text-sm md:text-base justify-center gap-x-2 w-full border rounded-sm py-1 font-medium text-[--primary-text] hover:text-black '>
					<a href='https://jobarena-backend.onrender.com/api/user/google' onClick={initiateGoogleLogin} className='flex items-center'><FcGoogle className='size-4 mr-2' /> {t("login with Google")}</a>
				</button>
				<div className=' my-4 flex justify-center items-center gap-x-2 text-xs md:text-sm font-medium text-[--dark-grey] '>
					<div className='border-t flex-1'></div>
					{t("or")}
					<div className='border-t flex-1'></div>
				</div>
				<form
					action=''
					className='flex flex-col items-start justify-start gap-y-4 '
					onSubmit={onSubmit}>
					<div className='flex flex-col items-start justify-start text-sm md:text-base gap-y-1 w-full mb-5 '>
						{/* <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
							<BsTelephoneFill size={30} />
						</div> */}
						<label htmlFor='email' className='text-[--primary-text] w-full font-medium flex justify-between '>
							<p>	{t("Phone Number")}</p>
							<small className='text-end text-gray-500 cursor-pointer' onClick={() => { setShowLoginPhone(false); setShowLogin(true) }}>{t("or")} {" "}{t("email")}</small>
						</label>
						<PhoneInput
							country={'in'}
							value={ph}
							onChange={setPh}


						/>
					</div>

					<button
						type='submit'
						className='w-full py-2 bg-[--button-background-color-border] hover:bg-transparent font-medium text-white hover:text-[--text-color-dark] hover:border hover:border-[--button-background-color-border] rounded-sm transition-colors duration-100 '>
						{t("login")}
					</button>
					<p className='self-center text-sm md:text-base text-[--primary-text] font-medium '>
						{t("new to internarea?")} <Link to='/register' className='hover:underline underline-offset-2 '  > {t("register")}</Link>
					</p>

				</form>
			</div>
		</div>
	);
};

export default LoginPhone;
