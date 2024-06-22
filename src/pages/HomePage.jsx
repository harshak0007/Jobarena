import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { HiMiniFire } from 'react-icons/hi2';

import UICard from '@/lib/utils/UICard';

import UICarousel from '@/lib/utils/UICarousel';
import { useNavbar } from '@/context/NavbarContext';
import { OTP } from '@/components';
import { popularCategories, stats, carouselImages } from '@/data/constants';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { setInternshipData } from '@/Feature/InternshipDataSlice'
import { setJobData } from '@/Feature/JobDataSlice'
import axios from 'axios';

const HomePage = () => {
	const dispatch = useDispatch();
	const internshipData = useSelector((state) => state.internshipData)
	const jobData = useSelector((state) => state.jobData)
	const language = useSelector((state) => state.language)
	const { i18n } = useTranslation();
	const { showOTP, t, imageMap } = useNavbar();
	const [selectedCategoryIntern, setSelectedCategoryIntern] = useState(t('big brands'))
	const [selectedCategoryJob, setSelectedCategoryJob] = useState(t('big brands'))
	const [filterInternShips, setFilterInternship] = useState([])
	const [filterJobs, setFilterJobs] = useState([])

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await axios.get(`https://jobarena-backend.onrender.com/api/internship/?lang=${language}`)
				dispatch(setInternshipData(response.data))
				console.log(response.data)
				response = await axios.get(`https://jobarena-backend.onrender.com/api/job/?lang=${language}`)
				dispatch(setJobData(response.data))
				console.log(jobData)

			} catch (error) {
				console.log(error)
			}
		}
		fetchData();
	}, [language, i18n.language, dispatch])

	useEffect(() => {
		const { token, sessionId } = queryString.parse(location.search);
		console.log(queryString.parse(location.search))
		if (token && sessionId) {
			localStorage.setItem('token', token);
			localStorage.setItem('sessionId', sessionId);
			navigate('/'); // Redirect to a dashboard or home page after successful login
		}
	}, []);

	useEffect(() => {
		let data = internshipData?.filter((item) =>
			!selectedCategoryIntern || item.category === selectedCategoryIntern
		);
		setFilterInternship(data);
		data = jobData?.filter((item) =>
			!selectedCategoryJob || item.category === selectedCategoryJob
		);
		setFilterJobs(data);

	}, [selectedCategoryIntern, internshipData, jobData, selectedCategoryJob]);

	useEffect(() => {
		// console.log('Updated Filtered Internships:', filterInternship);
	}, [filterInternShips, filterJobs]);


	return (
		<>

			<main className=''>

				{showOTP && <OTP />}
				<section id='hero' className='w-full md:h-screen max-w-[90%] mx-auto p-1'>
					<div className='relative'>
						<h1 className='text-center text-2xl md:text-4xl lg:text-6xl font-bold text-[#333] mt-[3rem]'>
							{/* Make your <span>dream career</span> a reality */}
							{t("title")}
						</h1>
						<span className='underline '></span>
					</div>
					<div id='trending'>
						<h2 className='lg:text-3xl md:text-2xl text-xl font-bold mt-16 flex justify-center items-center gap-x-1 text-center'>
							{t("subtitle")} <HiMiniFire className='fill-orange-600 md:size-9 size-6' />{' '}
						</h2>
						<UICarousel numSlides={3}>
							{carouselImages.map((url, i) => (
								<img key={i + 1} src={url} alt='' />
							))}
						</UICarousel>
					</div>
				</section>
				<section id='latest-internships' className=' bg-[#fafafa] min-h-fit pb-20 p-2'>
					<h2 className='font-bold mt-10 md:mt-16 text-xl md:text-2xl lg:text-3xl text-center text-[#333]'>
						{t("heading")}
					</h2>
					<div className='max-w-screen-lg mx-auto mt-6 text-base px-2 md:px-0 flex flex-col md:flex-row md:items-baseline justify-center flex-nowrap'>
						<span className='uppercase tracking-wider mr-4 text-[11px] md:text-[12px] lg:text-[14px] text-nowrap font-medium text-[--primary-text]'>
							{t("popular categories")}:
						</span>
						<ul className='flex gap-2 flex-wrap items-center text-xs lg:text-sm'>
							{popularCategories.map(category => (
								<button
									key={category}
									className='px-4 py-1 border border-[#ddd] rounded-full cursor-pointer font-medium text-[--primary-text] focus-within:bg-[--primary] focus-within:text-white focus-within:border-[--primary]' onClick={() => setSelectedCategoryIntern(t(category))}>
									{t(category)}
								</button>
							))}
						</ul>
					</div>
					<Carousel className='max-w-screen-xl w-full mx-auto mt-8 '>
						<CarouselContent className='*:basis-1/4 '>
							{filterInternShips?.map((data, i) => (
								<div key={i + 1}>
									<CarouselItem>
										<UICard data={data} type="internship" />
									</CarouselItem>
								</div>
							))}
						</CarouselContent>
						<div className='flex justify-center items-center gap-x-12 mt-8 '>
							<CarouselPrevious className="border size-7 md:size-10 border-[--primary-dark] hover:text-[--text-color]" />
							<CarouselNext className="border  size-7 md:size-10  border-[--primary-dark] hover:text-[--text-color]" />
						</div>
					</Carousel>
				</section>
				<section id='latest-jobs' className='bg-[#fafafa] min-h-fit pb-8 md:pb-20 p-2'>
					<h2 className='font-bold md:mt-8 text-xl md:text-2xl lg:text-3xl text-center text-[#333]'>{t("Latest jobs on JobArena")}</h2>
					<div className='max-w-screen-lg mx-auto mt-6  text-base flex flex-col md:flex-row  items-baseline justify-center flex-nowrap'>
						<span className='uppercase tracking-wider mr-4 text-[11px] md:text-[12px]  lg:text-[14px] text-nowrap font-medium text-[--primary-text]'>
							{t("popular categories")}:
						</span>
						<ul className='flex gap-2 flex-wrap items-center text-xs lg:text-sm'>
							{popularCategories.map(category => (
								<button
									key={category}
									className='px-4 py-1 border border-[#ddd] rounded-full cursor-pointer font-medium text-[--primary-text] focus-within:bg-[--primary] focus-within:text-white focus-within:border-[--primary]' onClick={() => setSelectedCategoryJob(t(category))}>
									{t(category)}
								</button>
							))}
						</ul>
					</div>
					<Carousel className='max-w-screen-xl w-full mx-auto mt-4 '>
						<CarouselContent className='*:basis-1/4 '>
							{filterJobs.map((data, i) => (
								<div key={i + 1}>
									<CarouselItem>
										<UICard data={data} type="jobData" />
									</CarouselItem>
								</div>
							))}
						</CarouselContent>
						<div className='flex justify-center items-center gap-x-12 mt-8 '>
							<CarouselPrevious className="border size-7 md:size-10 border-[--primary-dark] hover:text-[--text-color]" />
							<CarouselNext className="border size-7 md:size-10 border-[--primary-dark] hover:text-[--text-color]" />
						</div>
					</Carousel>
				</section>
				<section id='internarea-stats' className='border-t'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 mt-8 lg:mt-16 mb-10 lg:mb-24 max-w-screen-lg mx-auto *:text-center '>
						{stats.map((stat, i) => (
							<div key={i + 1} className='mb-3 flex flex-col justify-between items-center gap-y-1 border-r last:border-none '>
								<p className='text-3xl md:text-4xl lg:text-[44px] font-bold text-[--primary-darkest] tracking-wide md:pb-2 leading-none '>
									{t(stat.value)}+
								</p>
								<p className='text-base md:text-lg text-[--primary-text] '>{t(stat.desc)}</p>
							</div>
						))}
					</div>
				</section>
				<div
					className='flex flex-col lg:flex-row justify-between items-center  py-10 px-6  lg:py-24 lg:px-16 '
					style={{ background: `url(${imageMap[language]}) no-repeat center/cover` }}>
					<p className='text-xl md:text-3xl lg:text-4xl  font-bold text-[--text-color-dark] '>
						{t("footer heading")}
					</p>
					<div className='flex  md:w-full mt-4 md:flex-row items-center lg:justify-center gap-x-3 lg:gap-x-4 '>
						<button className='flex items-center justify-center gap-x-2 text-sm lg:text-lg bg-white px-2 py-2 lg:px-8 lg:py-3 rounded-md font-medium text-[--primary-text] '>
							<FcGoogle />{t("Continue with Google")}
						</button>
						<button className='text-sm lg:text-lg  font-medium bg-black/25 px-2 py-2 lg:px-8 lg:py-3 rounded-md text-white '>
							{t("register")} {t("now")}
						</button>
					</div>
				</div>
			</main>

		</>
	);
};

export default HomePage;
