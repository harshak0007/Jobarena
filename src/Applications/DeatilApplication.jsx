import { useNavbar } from '@/context/NavbarContext';
import axios from 'axios';
import { useEffect, useState } from 'react'


function DeatilApplication() {
  const { t,notificationsEnabled,setNotificationsEnabled } = useNavbar()
  const [data, setData] = useState([])
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("a")
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://jobarena-backend.onrender.com/api/application/${id}`)

      setData([response.data])
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (notificationsEnabled) {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                setNotificationsEnabled(false);
            }
        });
    }
}, [notificationsEnabled]);
const requestNotificationPermission = () => {
  

  Notification.requestPermission().then(permission => {
      if (permission === "granted") {
          console.log("Notification permission granted.");          
        } else {
          console.log("Notification permission denied or default.");
      }
  });
};
const showNotification = (message, type) => {
  console.log(Notification)
  console.log(notificationsEnabled)
 requestNotificationPermission();
  if (notificationsEnabled && Notification.permission === "granted") {
      new Notification(message, {
          body: `You have been ${type}.`,
          icon: '/logo.jpg',
          badge: 'https://img.freepik.com/free-photo/smooth-green-background_53876-108464.jpg',
          tag: type,
          image:type==='hired'?'https://img.freepik.com/free-photo/smooth-green-background_53876-108464.jpg':'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-68032.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722643200&semt=ais_hybrid',
          renotify: true,
          silent: false,
          requireInteraction: false,
          data: {
              type
          }
      }).onclick = function() {
          window.focus();
      };
  }
  
};
  const handleAcceptAndReject = async (id, action) => {
    try {
      const response = await axios.put(`https://jobarena-backend.onrender.com/api/application/${id}`, { action })
      const UpdateApplication = data.map(app => (app._id === id ? response.data.data : app))
      setData(UpdateApplication)
      console.log("done")

      if(action==='accepted'){
        showNotification('Someone hired you!', 'hired');
        document.body.style.backgroundColor = "green";
      }else{
        showNotification('Someone rejected your application.', 'rejected');
        document.body.style.backgroundColor = "blue";
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className=' '>
      {
        data.map((data, i) => (
          <section key={i + 1} className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-16 md:py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row items-center justify-evenly ">
                <img alt="ecommerce" className="lg:w-[30%] w-3/4 md:w-full lg:h-2/3 h-32 md:h-64 object-cover  rounded" src={'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'} />
                <div className="flex flex-col mt-7 md:mt-0 justify-evenly gap-5 text-sm md:text-base">
                  <div className="flex items-center gap-4">
                    <h2 className=" title-font text-[--button-text-color] font-semibold tracking-widest">{t("Company name")} :</h2>
                    <h1 className="text-[--text-color-dark] font-bold title-font ">{data.company}</h1>
                  </div>
                  <div className="flex  items-center gap-4">
                    <h2 className='font-semibold text-[--button-text-color]'>{t("Cover Letter")} :</h2>
                    <p className="leading-relaxed font-bold text-[--text-color-dark]">{data.coverLetter}</p>
                  </div>
                  <div className="flex  items-center gap-4">

                    <span className="font-semibold text-[--button-text-color]">{t("Application Date")}:</span><br />
                    <p className='font-bold text-[--text-color-dark]'>{new Date(data?.createAt).toLocaleDateString()}</p>

                  </div>
                  <div className="flex  items-center gap-4">
                    <h4 className='font-semibold text-[--button-text-color]'>{t("Applied By")} :</h4>
                    <p className='font-bold text-[--text-color-dark]'>{data.user}</p>
                  </div>
                  <div className="flex mt-4 justify-around">
                    <button className='py-2 px-5 md:py-3 md:px-7 border border-[#333] rounded-full text-[--text-color-dark]  font-bold' onClick={() => handleAcceptAndReject(data._id, "accepted")}>{t("Accept")}</button>
                    <button className='py-2 px-5 md:py-3 md:px-7 border border-[#333] rounded-full  text-red-600  font-bold' onClick={() => handleAcceptAndReject(data._id, "rejected")}>{("Reject")}</button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))
      }
    </div>
  )
}

export default DeatilApplication
