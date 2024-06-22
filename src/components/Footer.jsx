
import { RiGooglePlayLine, RiTwitterLine } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { LuLinkedin } from 'react-icons/lu';
import { FaYoutube } from 'react-icons/fa';
import { CiCoffeeCup } from "react-icons/ci";
import { Link } from 'react-router-dom';

import { footer } from '@/data/constants';
import { useTranslation } from 'react-i18next';


const Footer = () => {
	const { t } = useTranslation()
	return (
		<footer className='w-full min-h-screen bg-[--footer-bg]'>
			<div className='w-full py-2 md:py-8 text-[--text-color]'>
				<div className='grid grid-cols-2 pl-3   md:px-12 md:grid-cols-4 border-b border-[--grey] lg:pb-8 '>
					{footer.header.map((data, i) => (
						<div key={i + 1} className='w-fit'>
							<p className='font-medium text-base mb-3'>{t(data.heading)}</p>
							<ul>
								{data.body.map((item, i) => (
									<li key={i + 1} className='text-xs lg:text-sm mb-2 cursor-pointer '>{t(item)}</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className='grid grid-cols-2 pl-3  md:py-8 md:px-12 md:grid-cols-5 h-fit lg:mt-6'>
					{footer.footer.map((data, i) => (
						<ul key={i + 1} className='last:col-span-2 '>
							{data.map((item, i) => (
								<li key={i + 1} className='mb-2 text-xs lg:text-sm cursor-pointer w-fit'>{t(item)}</li>
							))}
						</ul>
					))}
				</div>
				<div className='mt-12 mb-4  flex flex-col px-4 md:flex-row items-center justify-between '>
					<div className='flex flex-col md:flex-row mb-2 md:mb-0  items-center justify-center lg:justify-start gap-x-3 lg:gap-x-6'>
						<button className='flex items-center justify-center gap-x-2 border border-[--button-background-color] rounded-md px-3 py-2  text-[--text-color] md:text-sm'>
							<RiGooglePlayLine className='size-6 md:size-5 ' /> {t("Get Android App")}
						</button>
						<div className='flex items-center justify-center md:justify-normal mt-4 md:mt-0 size-4 md:size-2  gap-x-4 text-[--text-color]'>
							<Link>
								<FaInstagram className='md:size-6' />
							</Link>
							<Link>
								<RiTwitterLine className='md:size-6' />
							</Link>
							<Link>
								<FaYoutube className='md:size-6' />
							</Link>
							<Link>
								<LuLinkedin className='md:size-6' />
							</Link>
						</div>
					</div>
					<p className='text-xs md:text-sm mt-2 md:mt-0' >{t("Copyright")}</p>
				</div>
			</div>
			<p className='text-center flex items-center justify-center gap-x-1 text-[--text-color] pb-4 text-xs md:text-sm'>
				{t("Made with")} <CiCoffeeCup /> {t("by harshak")}{' '}
			</p>
		</footer>
	);
};

export default Footer;
