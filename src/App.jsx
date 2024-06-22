

import { Routes, Route } from 'react-router-dom';
// import { Footer, Home, Navbar, Register } from './components';
import {
	HomePage, InternshipPage, RegisterPage, JobsPage, LoginHistoryPage,
} from '@/pages';
import { useNavbar } from './context/NavbarContext';
import { Footer, Navbar, InternDetail, JobDetail, AccessDenied, Login } from '@/components';
import { AdminLogin, Adminpanel, Postinternships, PostJob, ViewAllApplication } from './Admin';
import UserApplicatiom from './profile/UserApplicatiom';
import Profile from './profile/Profile';
import UserapplicationDetail from './Applications/DeatilApplicationUser';
import DeatilApplication from './Applications/DeatilApplication';
// import { translate } from './translate';
const App = () => {
	const { theme, accessAllowed, showLogin } = useNavbar();

	if (!accessAllowed) {
		return <AccessDenied />
	}
	return (

		<div className={`${theme} relative max-w-screen-2xl mx-auto bg-[--background-color]`}>
			<Navbar />
			{showLogin && <Login />}
			<Routes>
				<Route path='/*' element={<HomePage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/internships' element={<InternshipPage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route path='/history' element={<LoginHistoryPage />} />
				<Route
					path='/profile'
					element={<Profile />}
				/>
				<Route
					path='/detailjob'
					element={<JobDetail />}
				/>

				<Route
					path='/detailInternship'
					element={<InternDetail />}
				/>
				<Route
					path='/detailApplication'
					element={<DeatilApplication />}
				/>
				<Route
					path='/adminLogin'
					element={<AdminLogin />}
				/>
				<Route
					path='/adminPanel'
					element={<Adminpanel />}
				/>
				<Route
					path='/postInternship'
					element={<Postinternships />}
				/>
				<Route
					path='/postJob'
					element={<PostJob />}
				/>
				<Route
					path='/applications'
					element={<ViewAllApplication />}
				/>
				<Route
					path='/UserapplicationDetail'
					element={<UserapplicationDetail />}
				/>
				<Route
					path='/userapplication'
					element={<UserApplicatiom />}
				/>
			</Routes>

			<Footer />
		</div>

	);
};

export default App;
