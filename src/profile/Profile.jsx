
import { Link } from 'react-router-dom'
import { useNavbar } from '@/context/NavbarContext'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Profile.css'


function Profile() {
  const { userData, handleUserData,setNotificationsEnabled,notificationsEnabled } = useNavbar();
  const { t } = useTranslation()

  const handleToggle = () => {
    if(notificationsEnabled==="true"){
      localStorage.setItem("notificationsEnabled","false");
      setNotificationsEnabled("false");
      
    }
    else{
      localStorage.setItem("notificationsEnabled","true");
      setNotificationsEnabled("true");
      
    }
  };

  useEffect(() => {
    if(localStorage.getItem("notificationsEnabled")){
      console.log(localStorage.getItem("notificationsEnabled"))
      console.log(notificationsEnabled)
      setNotificationsEnabled(localStorage.getItem("notificationsEnabled"))
      console.log(notificationsEnabled)
  }
  else{
    setNotificationsEnabled("true")
  }
    handleUserData()
  }, [])
  return (
    <div className=''>
      <div className="flex items-center p-4   mt-9 mb-4 justify-center">
        <div className='w-[90%] md:w-[50%] lg:w-[40%] bg-red-50'>
          <div className='bg-white shadow-lg rounded-lg p-3'>
          <div className="slider-container  items-center pr-2 ">
            <h3 className='text-sm md:text-base'>Allow Notifications</h3>
      <label className="switch my-5">

        <input 
          type="checkbox" 
          checked={notificationsEnabled==='true'?true:false} 
          onChange={handleToggle} 
          
        />
        <span className="slider"></span>
      </label>
      <p className='text-sm md:text-base'>{notificationsEnabled==='true' ? 'ON' : 'OFF'}</p>
    </div>
            <div className="photo-wrapper p-2">
              <img src={'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'} alt="profile" className='w-32 h-32 rounded-full mx-auto' />
            </div>
            <div className='p-2'>

              <h3 className='text-center font-semibold text-xl text-[--button-text-color]'>{userData.name}</h3>
            </div>
            <div className='pl-4 my-3 flex gap-0 md:gap-5 items-center'>
              <h3 className='lg:text-xl font-semibold text-[--button-text-color]'>{t("UID")}</h3>
              <p className='text-center ml-1 lg:ml-3 text-sm lg:text-base text-[--text-colr-dark]'>{localStorage.getItem('sessionId')}</p>
            </div>
            <div className='pl-4 flex gap-5 items-center'>
              <h3 className='lg:text-xl font-semibold text-[--button-text-color]'>{t("email")}</h3>
              <h3 className='text-center ml-1 lg:ml-3 text-sm lg:text-base text-[--text-colr-dark]'>{userData.email}</h3>
            </div>
            <div className=' flex flex-col  md:flex-row justify-evenly my-6' >

              <Link to="/userapplication" className='' >
                <button className='w-full md:w-fit bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] text-base hover:bg-transparent rounded-full px-3 py-1 lg:px-6 lg:py-2' >{t("View Applications")}</button>
              </Link>
              <Link to="/userlocation" className='mt-5 md:mt-0'>
                <button className='w-full md:w-fit bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] text-base hover:bg-transparent rounded-full px-3 py-1 lg:px-6 lg:py-2' >{t("Location")}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile
