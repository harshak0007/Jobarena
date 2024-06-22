import { useNavbar } from '@/context/NavbarContext'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {

  const { t } = useNavbar()
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const LoginAmin = async () => {
    if (username === "" || password === "") {
      alert("fill the blanks")
    }
    else {
      const bodyjson = {
        username: username,
        password: password
      }
      axios.post("https://jobarena-backend.onrender.com/api/admin/adminLogin", bodyjson).then((res) => {
        console.log(res, "data is send")
        alert("success")
        navigate("/adminPanel")
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <div>
      <section className="text-[--text-color-dark] body-font relative">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl title-font mb-4 font-bold ">{t("admin")} {t("login")}</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed ">Login to post internship, post jobs and view applications.</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-col  items-center justify-center md:flex-row  md:flex-wrap -m-2">
              <div className="p-2 w-full md:w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm">{t("Name")}</label>
                  <input type="text" value={username} onChange={(e) => setusername(e.target.value)} id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full md:w-1/2">
                <div className="relative">
                  <label htmlFor="pass" className="leading-7 text-sm">{t("password")}</label>
                  <input type="pass" id="pass" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <button onClick={LoginAmin} className='mx-auto my-5 p-2 font-medium w-[40%] lg:w-[50%] block bg-[--button-background-color-border] text-[#fff] border  hover:text-[--text-color-dark] hover:border-[--button-background-color-hover] hover:bg-transparent rounded-full '>{t("login")}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin
