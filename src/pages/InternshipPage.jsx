import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LuFilter } from 'react-icons/lu';
import { PiClockClockwiseBold, } from "react-icons/pi";
import { Search, MapPin, Banknote, Calendar } from 'lucide-react';
// import { useNavbar } from '@/context/NavbarContext';
import { useDispatch, useSelector } from 'react-redux'
import { setInternshipData } from '@/Feature/InternshipDataSlice'
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const InternshipPage = () => {
	const [profile, setProfile] = useState('');
	const [location, setLocation] = useState('');
	const [wfh, setWfh] = useState(false);
	const [partTime, setPartTime] = useState(false);
	const [minStipend, setMinStipend] = useState(0);
	const [keywords, setKeywords] = useState('');

	const [filterData, setfilterData] = useState([])

	const dispatch = useDispatch();
	const internshipData = useSelector((state) => state.internshipData)
	const language = useSelector((state) => state.language)
	const { i18n, t } = useTranslation();


	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)



	const clearFilters = () => {
		setProfile('');
		setLocation('');
		setWfh(false);
		setPartTime(false);
		setMinStipend(0);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await axios.get(`https://jobarena-backend.onrender.com/api/internship/?lang=${language}`)
				dispatch(setInternshipData(response.data))
				console.log(response.data)

			} catch (error) {
				console.log(error)
			}
		}
		fetchData();
	}, [language, i18n.language, dispatch])


	useEffect(() => {
		if (
			!profile &&
			!location &&
			!wfh &&
			!partTime &&
			minStipend === 0 &&
			!keywords
		) {
			setfilterData(internshipData);
		} else {
			const filteredData = internshipData?.filter((item) => {
				return (
					(!profile || item.title === profile) &&
					(!location || item.location === location) &&
					(!wfh || item.category === t("work from home")) &&
					(!partTime || item.category === t("part-time")) &&
					(!minStipend || item.stipend >= minStipend) &&
					(!keywords || item.aboutInternship && item.aboutInternship?.includes(keywords))
				);
			});
			setfilterData(filteredData);
		}

	}, [profile, location, wfh, partTime, minStipend, keywords]);
	useEffect(() => {
		// profile, location, wfh, partTime, minStipend, keywords
	}, [filterData]);


	return (
		<>

			<main className='bg-[--light-grey] w-full '>
				<div className='w-full max-w-screen-lg mx-auto pt-1 pb-8 px-3 md:px-0 '>
					<Breadcrumb className='mt-6 '>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/'>{t("home")}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{t("internship")}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className='flex flex-col md:flex-row items-end  md:items-start justify-between gap-x-4 mt-20 h-full sticky top-0 '>
						<p className=' md:hidden flex items-center justify-center gap-x-1 mb-4  ' onClick={() => setIsFilterMenuOpen((prev) => !prev)}>
							<LuFilter className='text-[--primary-dark] stroke-1 ' />
							<span className='font-medium text-[--heading] '>{t("Filters")}</span>
						</p>
						<div className='hidden md:grid grid-rows-[auto_1fr] w-fit h-min sticky top-0  md:text-sm'>
							<div className='border border-[--grey] rounded-md flex flex-col items-start justify-start w-fit px-4 py-8 bg-white  '>
								<p className='flex items-center justify-center gap-x-1 self-center '>
									<LuFilter className='text-[--primary-dark] stroke-1 ' />
									<span className='font-medium text-[--heading] '>{t("Filters")}</span>
								</p>
								<form action='#' className='flex items-start justify-start flex-col gap-y-4 '>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full mt-4 '>
										<label htmlFor='profile' className='text-[--primary-text] md:text-sm font-medium '>
											{t("Profile")}
										</label>
										<input
											type='text'
											name='profile'
											id='profile'
											placeholder='e.g. Marketing'
											className='border w-full px-2 py-2 md:text-xs rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none tracking-wide '
											value={profile}
											onChange={e => setProfile(e.target.value)}
										/>
									</div>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
										<label htmlFor='location' className='text-[--primary-text] md:text-sm font-medium '>
											{t("Location")}
										</label>
										<input
											type='text'
											name='location'
											id='location'
											placeholder='e.g. Delhi'
											className='border w-full md:text-xs px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
											value={location}
											onChange={e => setLocation(e.target.value)}
										/>
									</div>
									<div className='flex items-center justify-start gap-x-2 w-full '>
										<input
											type='checkbox'
											name='wfh'
											id='wfh'
											className='size-4'
											checked={wfh}
											onChange={() => setWfh(prev => !prev)}
										/>
										<label htmlFor='wfh' className='text-[--primary-text] font-medium '>
											{t("work from home")}
										</label>
									</div>
									<div className='flex items-center justify-start gap-x-2 w-full -mt-2 '>
										<input
											type='checkbox'
											name='part-time'
											id='part-time'
											className='size-4'
											checked={partTime}
											onChange={() => setPartTime(prev => !prev)}
										/>
										<label htmlFor='part-time' className='text-[--primary-text] font-medium '>
											{t("part-time")}
										</label>
									</div>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
										<label htmlFor='stipend' className='text-[--primary-text] font-medium '>
											{t("Desired minimum monthly stipend")} (₹)
										</label>
										<Slider
											max={12000}
											step={2000}
											value={[minStipend]}
											onValueChange={val => setMinStipend(val)}
											className='mt-4'
										/>
										<div className='flex items-center justify-evenly w-full text-sm '>
											{[0, 2000, 4000, 6000, 8000, 10000].map((num, i) => (
												<button key={i + 1} onClick={() => setMinStipend(num)}>{num}</button>
											))}
										</div>
									</div>
									<button
										type='button'
										className='text-[--primary] hover:text-[--primary-dark] font-medium mt-8 text-sm self-end '
										onClick={clearFilters}>
										{t("Clear all")}
									</button>
								</form>
							</div>
							<div className='bg-white border border-[--grey] rounded-md px-4 py-8 mt-2 md:text-sm  '>
								<p className='font-medium text-lg md:text-base text-center text-[--heading] '>{t("Keyword Search")}</p>
								<div className='mt-4 flex items-center justify-between rounded-sm overflow-hidden border  border-[--grey] '>
									<input
										type='text'
										placeholder='e.g. Design, Mumbai, Infosys'
										className='w-full px-2 py-2 md:py-1 text-sm md:text-xs '
										value={keywords}
										onChange={e => setKeywords(e.target.value)}
									/>
									<button
										type='submit'
										className='bg-[--primary] hover:bg-[--primary-dark] px-2 py-2  text-white '>
										<Search className='size-5 md:size-3' />
									</button>
								</div>
							</div>
						</div>
						{isFilterMenuOpen && (<div className='grid grid-rows-[auto_1fr] w-full h-min top-0 text-sm'>
							<div className='border border-[--grey] rounded-md flex flex-col items-start justify-start w-fit px-4 py-8 bg-white  '>
								<p className='flex items-center justify-center gap-x-1 self-center '>
									<LuFilter className='text-[--primary-dark] stroke-1 ' />
									<span className='font-medium  text-[--heading] '>{t("Filters")}</span>
								</p>
								<form action='#' className='flex items-start justify-start flex-col gap-y-4 '>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full mt-4 '>
										<label htmlFor='profile' className='text-[--primary-text] font-medium text-sm'>
											{t("Profile")}
										</label>
										<input
											type='text'
											name='profile'
											id='profile'
											placeholder='e.g. Marketing'
											className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none tracking-wide '
											value={profile}
											onChange={e => setProfile(e.target.value)}
										/>
									</div>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
										<label htmlFor='location' className='text-[--primary-text] font-medium text-sm '>
											{t("Location")}
										</label>
										<input
											type='text'
											name='location'
											id='location'
											placeholder='e.g. Delhi'
											className='border w-full px-2 py-2 text-sm rounded-sm text-[--base-grey] hover:border-[--primary] focus-within:border-[--primary] outline-none invalid:border-red-500 tracking-wide '
											value={location}
											onChange={e => setLocation(e.target.value)}
										/>
									</div>
									<div className='flex items-center justify-start gap-x-2 w-full '>
										<input
											type='checkbox'
											name='wfh'
											id='wfh'
											className='size-4'
											checked={wfh}
											onChange={() => setWfh(prev => !prev)}
										/>
										<label htmlFor='wfh' className='text-[--primary-text] font-medium '>
											{t("work from home")}
										</label>
									</div>
									<div className='flex items-center justify-start gap-x-2 w-full -mt-2 '>
										<input
											type='checkbox'
											name='part-time'
											id='part-time'
											className='size-4'
											checked={partTime}
											onChange={() => setPartTime(prev => !prev)}
										/>
										<label htmlFor='part-time' className='text-[--primary-text] font-medium '>
											{t("part-time")}
										</label>
									</div>
									<div className='flex flex-col items-start justify-start gap-y-1 w-full '>
										<label htmlFor='stipend' className='text-[--primary-text] font-medium '>
											{t("Desired minimum monthly stipend")} (₹)
										</label>
										<Slider
											max={12000}
											step={2000}
											value={[minStipend]}
											onValueChange={val => setMinStipend(val)}
											className='mt-4'
										/>
										<div className='flex items-center justify-evenly w-full text-sm '>
											{[0, 2000, 4000, 6000, 8000, 10000].map((num, i) => (
												<button key={i + 1} onClick={() => setMinStipend(num)}>{num}</button>
											))}
										</div>
									</div>
									<div className="flex items-center justify-between w-full">
										<button
											type='button'
											className='text-[--primary] hover:text-[--primary-dark] font-medium mt-8 text-sm  '
											onClick={() => setIsFilterMenuOpen(false)}>
											{t("Apply")}
										</button>
										<button
											type='button'
											className='text-[--primary] hover:text-[--primary-dark] font-medium mt-8 text-sm  '
											onClick={clearFilters}>
											{t("Clear all")}
										</button>
									</div>
								</form>
							</div>
							<div className='bg-white border border-[--grey] mb-4 rounded-md px-4 py-8 mt-2 text-sm '>
								<p className='font-medium text-base text-center text-[--heading] '>{t("Keyword Search")}</p>
								<div className='mt-4 flex items-center justify-between rounded-sm overflow-hidden border border-[--grey] '>
									<input
										type='text'
										placeholder='e.g. Design, Mumbai, Infosys'
										className='w-full px-2 py-1 text-sm '
										value={keywords}
										onChange={e => setKeywords(e.target.value)}
									/>
									<button
										type='submit'
										className='bg-[--primary] hover:bg-[--primary-dark] px-2 py-2 text-white '>
										<Search className='size-3 ' />
									</button>
								</div>
							</div>
						</div>)}
						<div className='flex-1 flex flex-col w-full lg:w-fit gap-y-4 md:mr-3 '>
							{filterData?.map((el, i) => (
								<a key={i + 1} href="/#">
									<Card className='text-sm shadow-sm hover:shadow-lg hover:scale-[1.005] transition-transform duration-75'>
										<CardHeader className='flex items-start justify-between flex-row '>
											<div >
												<CardTitle className='text-base mb-1 '>{t(el.title)}</CardTitle>
												<CardDescription className="flex flex-col md:block">
													{t(el.company)}
													<span className='mt-1 md:ml-2 border border-[--primary-dark] text-[--primary-dark] rounded-xl px-2 text-[11px] md:text-xs py-[2px] '>{t("actively hiring")}</span>
												</CardDescription>
											</div>
											<img src="/images/companyLogo_placeholder.svg" alt="Company Logo" className='block size-8 md:size-10 lg:size-12 ' />
										</CardHeader>
										<CardContent className='text-[11px] md:text-xs flex flex-col md:flex-row md:items-center  md:gap-x-4'>
											<p className='flex items-center gap-x-1 text-[--primary-text]'> <MapPin className='size-4 text-inherit' /> {t(el.location)} </p>
											<p className='flex items-center gap-x-1 text-[--primary-text]'> <Calendar className='size-4 text-inherit' /> {t(el.Duration)}  </p>
											<p className='flex items-center gap-x-1 text-[--primary-text]'> <Banknote className='size-4 text-inherit' /> ₹ {t(el.stipend)}/month </p>
										</CardContent>
										<CardFooter className="flex items-center  justify-between">
											<p className='flex items-center gap-x-2 text-[--primary-dark] bg-[#EAFCFF] text-xs rounded-xl p-1 '> <PiClockClockwiseBold />  {t("5 days ago")} </p>
											<Link to={`/detailInternship?q=${el._id}`} ><button className='bg-transparent text-[--text-color-dark] border border-[--button-background-color-border] hover:bg-[--button-background-color-border] hover:text-[#fff] px-2 py-1  lg:px-4 lg:py-2'>{t("View In Deatils")}</button></Link>
										</CardFooter>
									</Card>
								</a>
							))}
						</div>
					</div>
				</div>
			</main>

		</>
	);
};

export default InternshipPage;
