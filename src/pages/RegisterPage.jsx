
import { Registration } from '@/components';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<>
			<nav className='w-full min-w-[305px] py-2 px-2 shadow-md '>
				<div className='max-w-screen-xl mx-auto '>
					<Link to='/'>
						<img src='/images/logo.png' alt='' className='w-20 sm:w-[100px] md:w-[120px] -mt-2 ' />
					</Link>
				</div>
			</nav>
			<Registration />
		</>
	);
};

export default Register;
