import { useEffect, useState } from 'react'
// import Jobs from "../Data/JobsDataAvl"

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useNavbar } from '@/context/NavbarContext'
import { useSelector } from 'react-redux'


function JobDetail() {
  const { user } = useNavbar();
  const language = useSelector((state) => state.language)
  const [isDivVisible, setDivVisible] = useState(false)
  const [textarea, setTextare] = useState("")
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate();
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q")
  const [data, setData] = useState([])
  const { t } = useNavbar()
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://jobarena-backend.onrender.com/api/job/${id}/?lang=${language}`)

      const { company, category } = response.data;
      setCompany(company)
      setCategory(category)
      setData(response.data)
    }
    fetchData()
  })
  const show = () => {
    setDivVisible(true)
  }
  const hide = () => {
    setDivVisible(false)
  }

  const submitApplication = async () => {
    const text = document.getElementById("text")
    if (text.value === "") {
      alert("Fill the mendetory fildes")
    }
    else {
      const bodyJson = {
        coverLetter: textarea,
        category: category,
        company: company,
        user: user,
        Application: id
      }

      await axios.post("https://jobarena-backend.onrender.com/api/application", bodyJson).then((res) => {

        console.log(res)
        alert("Appllication Submit")

      }).catch((err) => {
        console.log(err)
        alert("error happend")
      })
      navigate("/Jobs")
    }
  }

  return (
    <div className={`text-[--text-color-dark] relative `}>

      <div className="lg:p-20">

        <h1 className='font-bold text-2xl lg:text-3xl mt-4 lg:mt-0  text-center mb-6'>{data.title}</h1>
        <div className="shadow-sm rounded-md border bg-[#fff] mx-5 lg:mx-0 lg:mr-10 px-4 lg:px-8 ">
          <p className='mb-4 mt-3  bg-[--footer-bg] rounded-full w-fit px-3 py-1 text-sm lg:text-base' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> Actively Hiring</p>
          <div className="main-info align-baseline lg:mr-96 mt-7">
            <p className='text-xl md:text-[22px] lg:text-2xl font-bold mt-4 text-[--button-text-color]'> {data.title}</p>
            <p className='text-xs md:text-sm text-slate-300 font-bold'>{data.title}</p>
            <p className='my-3   text-base lg:text-xl'> <i className="bi bi-geo-alt-fill"></i> {data.location}</p>
          </div>
          <div className="flex text-xs md:text-sm justify-between">
            <p className='mt-3 text-slate-400'> <i className="bi bi-play-circle-fill"></i>   {t("Start Date")}  <br />  {data.StartDate}</p>


            <p className='mt-3 text-slate-400' > <i className="bi bi-calendar-check-fill"></i>  {t("Experience")}  <br />
              {data.Experience}</p>

            <p className='mt-3 text-slate-400'>  <i className="bi bi-cash"></i>   {t("Salary")} <br /> {data.CTC}</p>
          </div>

          <hr />
          <div className="aboutCompany flex justify-start">
            <p className='mt-3 text-base lg:text-xl font-bold text-start text-[--button-text-color]'> {t("About")} {data.company}</p>
            <br />
          </div>
          <div className="flex">

            <p className='text-blue-500 text-sm lg:text-base'> {t("instagram page")}  <i className='bi bi-arrow-up-right-square'></i></p>

          </div>
          <p className='mt-4 text-sm lg:text-base'> {data.aboutCompany}</p>
          <div className="about-Job">
            <p className='mt-3 text-base lg:text-xl font-bold text-start text-[--button-text-color]'>{t("About Job")}</p>
            <p className='text-sm'>{data.aboutJob}</p>
          </div>
          <p className='text-blue-500 text-sm lg:text-base justify-start'> {t("Learn Business Communication")}</p>

          <div className="whocan">
            <p className='mt-3 lg:text-xl font-bold text-start text-[--button-text-color]'>{t("Whocanapply")}</p>
            <p className='text-sm lg:text-base'>{data.Whocanapply}</p>
          </div>

          <p className='mt-3 lg:text-xl font-bold text-start text-[--button-text-color]'>{t("Perks")}</p>
          <p className='text-sm lg:text-base'>{data.perks}</p>

          <p className='mt-3 lg:text-xl font-bold text-start text-[--button-text-color]'> {t("Additional Information")}</p>
          <p className='text-sm lg:text-base'>{data.AdditionalInfo}</p>

          <p className='mt-3 lg:text-xl font-bold text-start text-[--button-text-color]'> {t("Number Of Opening")}</p>
          <p className='text-start text-sm lg:text-base'>{data.numberOfopning || '7'}</p>
          <div className='flex justify-center my-6 w-[50%] md:w-[30%] lg:w-[10%] mx-auto bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] hover:bg-transparent rounded-full '>
            <button className='flex justify-center align-middle my-3 lg:my-3' onClick={show}>{t("Apply")}</button>

          </div>

        </div>


      </div>
      {isDivVisible && (
        <div className='absolute top-0 left-0 bg-black/60 w-full h-full'>
          <div className="fixed top-[50%] left-1/2 lg:top-1/2 lg:left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full lg:mx-auto min-h-96 shadow-lg px-4 py-6 mx-2 my-3 rounded-md bg-white z-50 ">
            <button
              aria-label='close login modal'
              className='text-xl md:text-2xl lg:text-3xl ml-auto block  -mt-8 -mr-2 text-[--primary-text] hover:text-black p-2 '
              onClick={() => hide()}>
              &times;
            </button>
            <div className="">
              <p className='text-base lg:text-lg font-bold text-[--button-text-color]'>{t("Apply on for Company")} {data.company}</p>
              <p className='mt-3 text-xs lg:text-sm font-semibold text-start mb-3'>{data.aboutCompany}</p>
            </div>
            <div className="">
              <p className='font-semibold  text-lg lg:text-xl text-[--button-text-color]'>{t("Your resume")}</p>
              <small>{t("Your current resume will be submitted along with the application")}</small>

              <p className='mt-4 font-semibold  text-lg lg:text-xl text-[--button-text-color]'>{t("Cover Letter")}</p>

              <p className='text-xs lg:text-base'>{t("why should we hire for this role?")}</p>
              <textarea name="" placeholder='' id="text" className='mt-3 border rounded-lg w-full lg:w-[80%] lg:h-24' value={textarea} onChange={(e) => setTextare(e.target.value)}></textarea>
              <p className='mt-4 font-semibold  text-lg lg:text-xl text-[--button-text-color]'>{t("Your availiblity")}</p>
              <p className='mb-2 text-xs lg:text-sm'>{t("Confirm your availiblity")}</p>

            </div>
            <div className='text-xs lg:text-sm'>
              <input
                type="radio"
                value={t("Yes, I am available to join immediately")}



              />
              <label className='mx-3 text-sm'>
                {t("Yes, I am available to join immediately")}
              </label>
            </div>

            <div>
              <input
                type="radio"
                value={t("No, I am currently on notice period")}


              />
              <label className='mx-3 text-sm'>
                {t("No, I am currently on notice period")}
              </label>
            </div>

            <div>
              <input
                type="radio"
                value={t("No, I will have to serve notice period")}


              />
              <label className='mx-3 text-sm'>
                {t("No, I will have to serve notice period")}
              </label>
            </div>

            <div>
              <input
                type="radio"
                value={t("Other")}


              />
              <label className='mx-3 text-xs lg:text-sm'>
                {t("Other")} <span className='text-slate-500 text-[11px] lg:text-base'>
                  ({t("Please specify your availability")})  </span>
              </label>
            </div>
            <p className='mt-3 font-semibold text-lg lg:text-xl text-[--button-text-color]'>{t("Custom resume")} <span className='text-slate-500 text-xs lg:text-sm'>({t("Optional")})</span></p>
            <small className='text-slate-500 text-xs lg:text-base'>{t("Employer can download and view this resume")}</small>


            <div className=" flex mt-3 text-sm lg:text-base justify-end">
              {user ? (
                <button className='bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] hover:bg-transparent rounded-full px-3 py-1 lg:px-6 lg:py-2' onClick={submitApplication}  >{t("Submit application")}</button>
              ) : (
                <Link to={"/register"}>
                  <button className='bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] hover:bg-transparent rounded-full px-3 py-1 lg:px-6 lg:py-2' >{("Submit application")}</button>
                </Link>
              )

              }
            </div>
          </div>
        </div>
      )

      }
    </div>
  )
}

export default JobDetail
