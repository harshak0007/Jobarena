import { useNavbar } from '@/context/NavbarContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import "./admin.css";
import { Link } from 'react-router-dom'



function ViewAllApplication() {

  const [application, setApplication] = useState([])
  const { t } = useNavbar()
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get("https://jobarena-backend.onrender.com/api/application")
        setApplication(response.data)

      } catch (error) {
        alert(error)
      }

    }
    fetchApplication()

  }, [])
  console.log(application)
  return (
    <div>
      <div className='hidden md:flex flex-col items-center my-8  text-[--button-text-color]'>

        <h1 className='text-3xl font-semibold mt-3 '>{t("Total Applications")}</h1>
        <div className="flex justify-center " id='tabel'>
          <div className="applications flex flex-col mt-7">
            <div className="overflow-x-auto sm:-mx-6 md:mx-8 lg:mx-8">
              <table className="inline-block min-w-full text-left text-sm font-light border">
                <thead className='border-b font-medium'>
                  <tr className='bg-[--button-background-color-2] text-[--text-color]'>
                    <th scope='col' className='px-5 py-4'>{t("company")}</th>
                    <th scope='col' className='px-5 py-4'>{t("Category")}</th>
                    <th scope='col' className='px-5 py-4'>{t("Applied On")}</th>
                    <th scope='col' className='px-5 py-4'>{t("Applied By")}</th>
                    <th scope='col' className='px-5 py-4'>{t("view details")}</th>
                    <th scope='col' className='px-5 py-4'>{t("Application Status")}</th>

                  </tr>

                </thead>
                <tbody>
                  {
                    application.map((data) => (
                      <>

                        <tr className='border-b text-[--text-color-dark]'>
                          <td className='whitespace-nowrap px-6 py-4'>{data.company}</td>
                          <td className='whitespace-nowrap px-6 py-4'>{data.category}</td>
                          <td className='whitespace-nowrap px-6 py-4'>{new Date(data?.createAt).toLocaleDateString()}</td>
                          <td className='whitespace-nowrap px-6 py-4'>{data.user}</td>
                          <td className='whitespace-nowrap px-6 py-4 text-blue-500'><Link to={`/detailApplication?a=${data._id}`}>{t("view details")}</Link></td>
                          <td className={`whitespace-nowrap px-6 py-4 ${data.status === 'rejected' && 'text-red-500'}  ${data.status==="accepted"&&'text-green-500'}`}>{data.status}</td>
                        </tr>
                      </>
                    ))
                  }
                </tbody>
              </table>

            </div>

          </div>

        </div>

      </div>

      <div className='block md:hidden'>
        <h1 className='text-center text-[--text-color-dark] my-6 text-xl font-semibold'>{("View All Applications")}</h1>
        {application.map((data, i) => (
          <section key={i + 1} className="text-gray-600 body-font">
            <div className="container px-5 py-2 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-14 h-14 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-[--text-color-dark] text-lg title-font font-medium mb-3">  {data.company}</h2>
                      <p className="leading-relaxed text-base"> {t("Applied By")} - <span className='font-semibold'> {data.user}</span></p>
                      <p className="leading-relaxed text-base"> {t("Applied On")} - <span className='font-semibold'> {new Date(data?.createAt).toLocaleDateString()}</span></p>
                      <p className="leading-relaxed text-base"> {t("Application status")} - <span className='font-semibold capitalize'>{data.status}</span></p>
                      <Link to={`/detailApplication?a=${data._id}`} className="mt-3 text-indigo-500 inline-flex items-center">{t("view details")}
                        <i className="bi bi-chevron-compact-right text-blue-500" ></i>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))

        }

      </div>

    </div>
  )
}

export default ViewAllApplication
