import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import UICard from './UICard';

const UICarousel = ({ numSlides = 3, className, children }) => {
	const colSize = Math.floor(100 / numSlides);
	// const [colWidth] = useState(Math.floor(100/numSlides))

	const prevSlide = () => { };
	const nextSlide = () => { };
	return (
		<div
			id='carousel'
			className={`w-full max-w-[1200px] mx-auto mt-12 p-2  ${className}`}
		// style={{ mask: 'linear-gradient(90deg, transparent, white 0%, white 95%, transparent)' }}
		>
			<div
				id='carousel_container'
				className={`grid grid-flow-col auto-cols-[50%] md:auto-cols-[32%] gap-x-4 overflow-auto overscroll-contain scroll-smooth snap-mandatory snap-x *:snap-start pb-8  `}>
				{children}
			</div>
			<div className='flex items-center justify-center gap-x-12'>
				<button
					className='p-2 bg-white border border-[--primary-dark] rounded-full '
					onClick={prevSlide}>
					<ChevronLeft className='size-3 md:size-5 hover:text-[--text-color]' />
				</button>
				<button
					className='p-2 bg-white border border-[--primary-dark] rounded-full '
					onClick={nextSlide}>
					<ChevronRight className='size-3 md:size-5 hover:text-[--text-color] ' />
				</button>
			</div>
		</div>
	);
};

export default UICarousel;
