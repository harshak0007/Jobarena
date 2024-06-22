import { useNavbar } from '@/context/NavbarContext';
import axios from 'axios';
import { useEffect, useState } from 'react'


function DeatilApplication() {
  const [data, setData] = useState([])
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("a")
  const { t } = useNavbar()
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://jobarena-backend.onrender.com/api/application/${id}`)

      setData([response.data])
    }
    fetchData()
  }, [id])

  console.log(data)
  return (
    <div className=' '>
      {
        data.map((data, i) => (
          <section key={i + 1} className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
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
