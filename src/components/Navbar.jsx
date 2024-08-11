import { useEffect, useState } from 'react';
import { ChevronDown } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';
import { SlMenu } from 'react-icons/sl';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { languages, navItems, profileData } from '@/data/constants';
import { GrLanguage } from 'react-icons/gr';
import { useNavbar } from '@/context/NavbarContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const Navbar = () => {
	const { t } = useTranslation();
	const [showMenu, setShowMenu] = useState(false);
	const [showRegisterMenu, setShowRegisterMenu] = useState(false);
	const [activeMobileLang, setActiveMobileLang] = useState(false);

	const [toggleLanguageMenu, setToggleLanguageMenu] = useState(false);
	const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
	const {admin,setAdmin, setShowLogin, user, setUser, handleSendOtpEmail, handleSendOtpPhone, selectedLanguage, setSelectedLanguage, handleUser } = useNavbar();
	const navigator = useNavigate()

	const handleLanguageChange = async (language) => {

		setSelectedLanguage(language)
		if (language == 'fr') {
			await handleSendOtpEmail()
		}
		else {
			await handleSendOtpPhone()
		}
	}

	useEffect(() => {
		handleUser()
		console.log(user)
	}, [user])

	const toggleMenu = () => {
		setShowMenu(prev => !prev);
	};

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('sessionId')
		setUser(null)
		navigator('/')

	}
	const handleLogoutAdmin=()=>{
		setAdmin(null)
		localStorage.removeItem('admin')
		navigator('/')
	}

	return (
		<nav className='relative border-b-2 w-full text-nowrap bg-inherit z-20 bg-white'>
			<div className='flex justify-between lg:justify-between items-center gap-x-4 lg:max-w-[95%] lg:max-w-[90%]  px-2  mx-auto '>
				{/* 
				===========================
					left navbar section
				===========================
				*/}
				<div className='flex items-center justify-start gap-x-1 lg:max-lg:gap-x-4'>
					<button className='p-2 lg:hidden' onClick={toggleMenu} aria-label='open sidebar menu'>
						<SlMenu className='text-base' />
					</button>
					<Link to='/' className='outline-none focus:border-none'>
						<img
							src='images/logo.png'
							className='w-20 lg:w-28 min-w-24 object-cover object-center -mt-2 outline-none'
							alt='InternArea logo'
						/>
					</Link>

					{/* sidebar - mobile */}
					<div className='absolute top-0 left-0 w-full h-vh bg-black/10 z-60'></div>
					<div
						className={`lg:hidden absolute top-0 left-0 w-4/5 h-dvh max-w-[320px] bg-[--background-color] shadow-lg rounded-br rounded-tr -translate-x-full transition-transform z-50 text-[--text-color-dark] ${showMenu ? 'translate-x-0' : ''
							}`}
						>
						<button className='block ml-auto mr-4 mt-1 text-3xl py-1 px-2' onClick={toggleMenu}>&times;</button>
						{user && (
							<div className='mb-1 cursor-pointer font-semibold border-b border-dashed'>
								<Link to='/profile' className='flex gap-x-2 items-center w-full px-4 py-2'>
									<img
										className='size-12 rounded-full object-cover object-center'
										src='https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'
										alt=''
									/>
									<div>
										<h2 id='user-name'>{user}</h2>
										<p className='font-normal text-sm'>Student</p>
									</div>
								</Link>
							</div>
						)}
						<ul>
							<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
								<Link to='/internships' className='w-full block px-4 py-3'>
									{t("internship")}
								</Link>
							</li>
							<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
								<Link to='/jobs' className='w-full block px-4 py-3'>
									{t("jobs")}
								</Link>
							</li>
							<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
								<div className='w-full block px-4 py-3' onClick={()=>setActiveMobileLang(!activeMobileLang)}>
									{t("languages")}
								</div>
								{activeMobileLang&&<ul>
									{languages.map(language => (
										<li
											key={language.value}
											className={`${selectedLanguage==language.value?'bg-gray-300':""} w-full hover:bg-[--button-background-color-2] text-center  cursor-pointer text-[--text-color-dark] hover:text-[--text-color-hover] `}>
											<label
												htmlFor={`language-${language.value}`}
												className='block w-full px-2 py-1 cursor-pointer '>

												<input
													type='radio'
													name='selectLanguage'
													id={`language-${language.value}`}
													checked={selectedLanguage === language.value}
													onClick={() => handleLanguageChange(language.value)}
													className='appearance-none'
												/>
												<span>{language.label}</span>
											</label>
										</li>
									))}
								
								</ul>}
							</li>
							<hr />
							{user ? (
								<>
									<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
										<Link to='/userapplication' className='w-full block px-4 py-3'>
											My Applications
										</Link>
									</li>
									<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
										<Link to='/applications' className='w-full block px-4 py-3'>
											My Resume
										</Link>
									</li>
									<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
										<Link onClick={() => handleLogout()} className='w-full block px-4 py-3'>
											{t("logout")}
										</Link>
									</li>
								</>
							) : (
								<>
								<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
										<Link to='/hire-talent' className='w-full block px-4 py-3' >
											{t("hire talent")}
										</Link>
									</li>
								{
									admin?<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
									<Link onClick={() => handleLogoutAdmin()} className='w-full capitalize block px-4 py-3'>
										{t("logout")} 
									</Link>
								</li>:
									<>
									<Link to={'/'}>
										<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
											<button className='w-full block px-4 py-3' onClick={() => setShowLogin(true)}>
												{t("login")}
											</button>
										</li>
									</Link>
									<li className='mb-1 cursor-pointer hover:bg-zinc-100 transition-colors font-semibold '>
									<Link to='/adminLogin' className='w-full block px-4 py-3' >
										{t("admin")}
									</Link>
									
								</li>
									</>
								}
									
									
									
									
								</>
							)}
						</ul>
					</div>

					{/* nav buttons */}
					<ul className='lg:flex justify-start items-center gap-x-2 hidden'>
						{navItems.map(navItem => (
							<li className='has-[:hover]:bg-[--button-background-color-2] has-[:hover]:text-[--text-color-hover]' key={navItem.title}>
								<HoverCard openDelay={1} closeDelay={0}>
									<Link to={navItem.href}>
										<HoverCardTrigger className='inline-flex gap-x-1 justify-center items-center px-3 py-6 text-sm font-semibold cursor-pointer'>
											{t(navItem.title)} <ChevronDown className='size-4' />
										</HoverCardTrigger>
									</Link>
									<HoverCardContent
										align='start'
										sideOffset={0}
										className='w-fit rounded-none px-0 py-2 flex gap-x-4 flex-nowrap z-50'>
										<div>
											<ul>
												{navItem.dropdownContent.map((section, index) => (
													<li key={index + 1} className='px-4 py-2 rounded-r-full hover:bg-[--button-background-color-2] group/isOpened:bg-red-500  hover:text-[--text-color-hover] text-black/70 selected  capitalize font-semibold transition-colors duration-100 has-[:hover]:bg-[#eafcff]'>
														{t(section.heading)}
													</li>
												))}
											</ul>
										</div>
										<div className='mr-12 border-l border-zinc-200'>
											<ul>
												{navItem.dropdownContent[0].data.map((title, i) => (
													<li key={i + 1} className='px-4 py-1 hover:text-[--primary-darkerr] font-medium cursor-pointer text-sm'>
														{t(title)}
													</li>
												))}
											</ul>
										</div>
									</HoverCardContent>
								</HoverCard>
							</li>
						))}
					</ul>
				</div>

				{/* 
				===========================
					right navbar section
				===========================
				*/}
				<div className='relative'>
					{!admin&&!user&&
					<>
					<button
						onClick={() => setShowRegisterMenu(prev => !prev)}
						className='flex justify-center items-center gap-x-1 bg-[--button-background-color] text-[--nav-button-color] font-semibold px-2 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded outline-none border border-[--button-background-color-border]  sm:hidden'>
						{t("register")} <ChevronDown className='size-4 mt-1' />{' '}
					</button>
					
					<ul
						className={`${showRegisterMenu ? 'block' : 'hidden'
							} absolute top-full right-0 w-[150%] bg-white shadow-md my-1 rounded `}>
						<li>
							<Link to='/register' onClick={() => setShowRegisterMenu(false)} className='px-3 py-2 block hover:bg-zinc-100'>
								As a {t("student")}
							</Link>
						</li>
						

						<li>
							<Link to='/adminLogin' onClick={() => setShowRegisterMenu(false)} className='px-3 py-2 block hover:bg-zinc-100'>
								As an {t("admin")}
							</Link>
						</li>
						
					</ul>
					</>
					}
					{
						admin&&<button
						onClick={() => handleLogoutAdmin()}
						className=' capitalize flex justify-center items-center gap-x-1 bg-[--button-background-color] text-[--nav-button-color] font-semibold px-2 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded outline-none border border-[--button-background-color-border]  sm:hidden'>
						{t("logout")} {' '}
					</button>
					}
					{
						user&&<button
						onClick={() => handleLogout()}
						className=' capitalize flex justify-center items-center gap-x-1 bg-[--button-background-color] text-[--nav-button-color] font-semibold px-2 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded outline-none border border-[--button-background-color-border]  sm:hidden'>
						{t("logout")} {' '}
					</button>
					}
					<ul className='hidden sm:flex justify-start items-center gap-x-3 '>
						<li>
							<button className='inline-flex gap-x-1 justify-center items-center p-3 hover:bg-zinc-50 rounded-[3px] text-sm text-zinc-600 font-semibold flex-nowrap'>
								<LuSearch className='text-xl text-zinc-600' /> {t("search")}
							</button>
						</li>
						<li>
							{user ? <button
								onClick={() => handleLogout()}
								className='text-[--nav-button-color-2] text-sm bg-[--nav-button-color] font-semibold px-5 py-2 border border-[--button-background-color] rounded outline-none hidden lg:block'>
								{t("logout")}
							</button> :
							
								admin?<button
								onClick={() => handleLogoutAdmin()}
								className='text-[--nav-button-color-2] text-sm bg-[--nav-button-color] font-semibold px-5 py-2 border border-[--button-background-color] rounded outline-none hidden lg:block'>
								{t("logout")}
							</button>: 
								<button
									onClick={() => setShowLogin(true)}
									className='text-white bg-[--button-background-color-border] text-sm font-semibold px-5 py-2 hover:bg-transparent hover:text-[--text-color-dark] hover:border hover:border-[--button-background-color-border] rounded-full outline-none hidden lg:block'>
									{t("login")}
								</button>
							
							}
						</li>

						<li className='break-keep'>
							<Link
								to='/hire-talent'
								className='text-[--nav-button-color] text-sm text-nowrap bg-[--button-background-color]  font-semibold px-5 py-2 border border-[--button-background-color-border] rounded outline-none'>
								{t("hire talent")}
							</Link>
						</li>
						{
							!user&&!admin&&
						<li className='break-keep'>
							<Link
								to='/adminLogin'
								className='text-[--nav-button-color] text-sm bg-[--button-background-color] font-semibold px-5 py-2 border border-[--button-background-color-border] rounded outline-none'>
								{t("admin")}
							</Link>
						</li>
						}
						{user && <li className='break-keep'>
							<Link
								to='/history'
								className='text-[--nav-button-color] text-sm bg-[--button-background-color] font-semibold px-5 py-2 border border-[--button-background-color-border] rounded outline-none'>
								{t("History")}
							</Link>
						</li>}
						{true && (
							<li
								className='relative flex items-center justify-center gap-x-1 p-2 bg-white rounded-sm group '
								onClick={() => setToggleLanguageMenu(prev => !prev)}>
								<GrLanguage className='size-5 text-[--text-color-dark] hover:text-[--button-background-color-hover] ' />
								<ul
									className={`absolute top-full right-2 bg-inherit shadow-md w-32 mt-2 z-50 ${toggleLanguageMenu ? 'block' : 'hidden'
										} `}>
									{languages.map(language => (
										<li
											key={language.value}
											className='w-full hover:bg-[--button-background-color-2] cursor-pointer text-[--text-color-dark] hover:text-[--text-color-hover] '>
											<label
												htmlFor={`language-${language.value}`}
												className='block w-full px-2 py-1 cursor-pointer '>

												<input
													type='radio'
													name='selectLanguage'
													id={`language-${language.value}`}
													checked={selectedLanguage === language.value}
													onClick={() => handleLanguageChange(language.value)}
													className='appearance-none'
												/>
												<span>{language.label}</span>
											</label>
										</li>
									))}

								</ul>
							</li>
						)}
						{user && (
							<li
								className='relative flex items-center justify-center gap-x-1 p-2 bg-white rounded-sm group '
								onClick={() => setToggleProfileMenu(prev => !prev)}>
								<span className="relative inline-block">
									<img
										className="h-10 w-10 rounded-full"
										src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
										alt="Dan_Abromov"
									/>
									<span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
								</span>
								<ul
									className={`absolute top-full right-2 bg-inherit shadow-md w-32 mt-2 z-50 ${toggleProfileMenu ? 'block' : 'hidden'
										} `}>
									{profileData.map(el => (
										<Link key={el.label} to={el.href}>
											<li onClick={el.label === 'Logout' ? handleLogout : ""}
												className='hover:bg-[--button-background-color-2] cursor-pointer text-[--text-color-dark] block w-full px-2 py-1 font-medium hover:text-[--text-color-hover] '>
												{t(el.label)}
											</li>
										</Link>
									))}

								</ul>
							</li>
						)}

					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
