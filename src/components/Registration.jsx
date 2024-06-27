import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { MdErrorOutline } from 'react-icons/md';
import { Login } from './index';
import { useNavbar } from '@/context/NavbarContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { handleGoogleLogin, signupUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),

});

const Registration = () => {
	const { showLogin, setShowLogin, setUser, t } = useNavbar();
	const navigate = useNavigate();
	const [ph, setPh] = useState('');





	const initiateGoogleLogin = async () => {
		try {
			await handleGoogleLogin();
		} catch (error) {
			console.error("Google login failed:", error);
		}
	};

	useEffect(() => {
		setShowLogin(false);
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(registerSchema) });

	const onSubmit = async data => {
		const formData = {
			name: data.firstName + " " + data.lastName,
			email: data.email,
			password: data.password,
			phone: '+' + ph
		}
		console.log(formData)
		try {
			await signupUser(formData)
			setUser(localStorage.getItem('token'))
			navigate("/")

		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	return (
		<>
			<section
				id='register'
				className='grid place-content-center min-h-dvh min-w-[305px] '
				style={{ background: 'url("/images/registration-background.png") fixed no-repeat bottom/cover' }}>
				{showLogin && <Login />}
				<header className='px-6 mt-4 md:mt-6 '>
					<div className='relative mb-4 lg:mb-6 w-fit min-[400px]:mx-auto '>
						<h1 className='text-lg md:text-xl font-bold lg:text-[40px] lg:font-extrabold text-[--heading] leading-none  '>
							{t("Sing-up and Apply For Free")}
						</h1>
						<span
							style={{ background: "url('/images/underline.svg') no-repeat center/contain " }}
							className='absolute top-1/2 left-1/2 lg:top-[90%] lg:right-0 w-1/2 h-10'></span>
					</div>
					<p className='lg:font-medium text-sm lg:text-2xl mb-3 min-[400px]:text-center text-[--heading] '>
						{t("1,50,000+ companies hiring on Internshala")}
					</p>
				</header>
				<div
					aria-label='registration-form'
					className='w-full max-w-md mx-auto lg:mt-8 rounded-xl px-6 lg:px-8 py-6 bg-white lg:shadow-[-2px_-2px_6px_rgba(0,107,194,0.12),2px_2px_6px_rgba(0,107,194,0.12)] '>
					<button className='flex items-center text-sm md:text-base justify-center gap-x-2 w-full border rounded-sm py-1 font-medium text-[--primary-text] hover:text-black '>
						<a href='http://localhost:5000/api/user/google' onClick={initiateGoogleLogin} className='flex items-center'><FcGoogle className='size-4 mr-2' /> {t("Sign In with Google")}</a>
					</button>
					<div className='my-2 md:my-4 flex justify-center items-center gap-x-2 text-xs md:text-sm font-medium text-[--dark-grey] tracking-wide '>
						<div className='border-t flex-1'></div>
						{t("or")}
						<div className='border-t flex-1'></div>
					</div>

					<form
						action=''
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col items-start justify-start gap-y-4 '>
						<div className='flex flex-col items-start justify-start gap-y-1 w-full  '>
							<label htmlFor='email' className='text-[--primary-text] font-medium text-[13px] md:text-sm '>
								{t("email")}
							</label>
							<input
								type='email'
								name='user-email'
								id='email'
								{...register('email')}
								placeholder='john@example.com'
								className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
							/>
							{errors.email && (
								<p className='text-red-500 text-sm flex items-center justify-start gap-x-1'>
									<MdErrorOutline /> {errors.email.message}
								</p>
							)}
						</div>
						<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
							<label htmlFor='password' className='text-[--primary-text] font-medium text-[13px] md:text-sm '>
								{t("password")}
							</label>
							<input
								type='password'
								name='user-password'
								id='password'
								{...register('password')}
								placeholder='Must be at least 6 characters'
								className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
							/>
							{errors.password && (
								<p className='text-red-500 text-sm flex items-center justify-start gap-x-1'>
									<MdErrorOutline /> {errors.password.message}
								</p>
							)}
						</div>
						<div className='flex items-center justify-between w-full gap-x-4 '>
							<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
								<label htmlFor='firstName' className='text-[--primary-text] font-medium text-[13px] md:text-sm '>
									{t("first-name")}
								</label>
								<input
									type='text'
									name='user-first-name'
									id='firstName'
									{...register('firstName')}
									placeholder='John'
									className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
								/>
								{errors.firstName && (
									<p className='text-red-500 text-sm flex items-center justify-start gap-x-1'>
										<MdErrorOutline /> {errors.firstName.message}
									</p>
								)}
							</div>
							<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
								<label htmlFor='lastName' className='text-[--primary-text] font-medium text-[13px] md:text-sm '>
									{t("last-name")}
								</label>
								<input
									type='text'
									name='user-last-name'
									id='lastName'
									{...register('lastName')}
									placeholder='Doe'
									className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
								/>
								{errors.lastName && (
									<p className='text-red-500 text-sm flex items-center justify-start gap-x-1'>
										<MdErrorOutline /> {errors.lastName.message}
									</p>
								)}
							</div>
						</div>
						<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
							<label htmlFor='phoneNo' className='text-[--primary-text] font-medium text-[13px] md:text-sm '>
								{t("Phone Number")}
							</label>

							<PhoneInput
								country={'in'}
								value={ph}
								onChange={setPh}


							/>
						</div>
						<small className='text-[--primary-text] text-sm md:text-base'>
							{t("By signing up, you agree to our")}{' '}
							<a href='#' className='text-[--primary] text-xs md:text-base font-normal hover:text-[--primary-dark] '>
								{t("Terms and Conditions")}
							</a>
							.
						</small>
						<button
							type='submit'
							className='w-full font-medium bg-[--primary] hover:bg-[--primary-dark] text-white text-sm tracking-wide py-2 rounded-sm '>
							{t("sign up")}
						</button>
					</form>
					<p className='mt-4 text-xs md:text-sm font-medium text-center '>
						{t("already registered")}?{' '}
						<button onClick={() => setShowLogin(true)} className='text-[--primary] '>
							{t("login")}
						</button>{' '}
					</p>
				</div>
			</section>
		</>
	);
};

export default Registration;
