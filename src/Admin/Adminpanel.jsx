
import { Link } from 'react-router-dom'
import { RiSendPlaneFill } from "react-icons/ri";
import { BsMailbox2Flag } from "react-icons/bs";
import { useNavbar } from '@/context/NavbarContext';
function Adminpanel() {

  const { t } = useNavbar()
  return (
    <div className=" border w-full overflow-hidden rounded-lg   shadow-sm block  mx-auto">
      <div className="mx-auto flex max-w-screen-lg items-center gap-8 p-8">
        <div className="grid w-full  lg:w-2/3 grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/applications" className="group flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[--button-background-color-border] text-white shadow-lg transition duration-100 group-hover:bg-[--button-background-color-hover] group-active:bg-[--button-background-color-border] md:h-12 md:w-12">
              <BsMailbox2Flag />
            </div>

            <div>
              <div className="mb-1  font-semibold text-[--button-text-color]">{t("View Applications")}</div>
              <p className="text-xs md:text-sm text-[--text-color-dark]">{t("View All the Applications That you got from applicants")}</p>
            </div>
          </Link>

          <Link to={"/postJob"} className="group flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[--button-background-color-border] text-white shadow-lg transition duration-100 group-hover:bg-[--button-background-color-hover] group-active:bg-[--button-background-color-border] md:h-12 md:w-12">
              <RiSendPlaneFill />
            </div>

            <div>
              <div className="mb-1 font-semibold text-[--button-text-color]">{t("Post Job")}</div>
              <p className="text-xs md:text-sm text-[--text-color-dark]">{t("Post Jobs According to Your Requirements")}</p>
            </div>
          </Link>

          <Link to={"/postInternship"} className="group flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[--button-background-color-border] text-white shadow-lg transition duration-100 group-hover:bg-[--button-background-color-hover] group-active:bg-[--button-background-color-border] md:h-12 md:w-12">
              <RiSendPlaneFill />
            </div>
            <div>
              <div className="mb-1 font-semibold text-[--button-text-color]">{t("Post InternShips")}</div>
              <p className="text-xs md:text-sm text-[--text-color-dark]">{t("Post InternShip According To Your Requirements")} </p>
            </div>
          </Link>

        </div>


      </div>
    </div>


  )
}

export default Adminpanel
