import { useEffect } from "react"
import { useNavbar } from "@/context/NavbarContext"
const LoginHistoryPage = () => {

    const { handleLoginHistory, loginHistory, t } = useNavbar();
    useEffect(() => {
        handleLoginHistory()
    }, [])
    return (
        <div>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-3xl font-semibold text-[--text-color-dark]">{t("Login History")}</h2>

                    </div>

                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[--button-background-color-2]">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-[--text-color]"
                                            >
                                                <span>{t("IP Address")}</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal  text-[--text-color]"
                                            >
                                                {t("Browser")}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal  text-[--text-color]"
                                            >
                                                {t("Operating System")}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal  text-[--text-color]"
                                            >
                                                {t("Device Type")}
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal  text-[--text-color]"
                                            >
                                                {t("Login Time")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white text-[--text-color-dark]">
                                        {loginHistory.map((history, i) => (
                                            <tr key={i + 1}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">
                                                        {history.ipAddress}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ">
                                                        {history.browser}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ">
                                                        {history.os}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                                    {history.deviceType}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="inline-flex rounded-full bg-[--button-background-color-border] px-2 text-xs font-semibold leading-5 text-[--text-color]">
                                                        {history.loginAt}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginHistoryPage
