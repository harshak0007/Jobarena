import { useContext, createContext, useState, useEffect } from "react";
import { sendOtpEmail, verifyOtpEmail, sendOtpPhone, verifyOtpPhone, getLoginHistory, getUser, getUserData, loginUser, sendOtpEmailLogin, verifyOtpEmailLogin, sendOtpPhoneLogin, verifyOtpPhoneLogin } from "../utils/api"
import { toast } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
export const NavbarContext = createContext();

// eslint-disable-next-line react/prop-types
export const NavbarContextProvider = ({ children }) => {
    const [accessAllowed, setAccessAllowed] = useState(false);
    const lastLanguage = localStorage.getItem('lang') || "en";
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginPhone, setShowLoginPhone] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [otpType, setOtpType] = useState('phone');
    const [selectedLanguage, setSelectedLanguage] = useState(lastLanguage);
    const [loginHistory, setLoginHistory] = useState([]);
    const [notificationsEnabled, setNotificationsEnabled] = useState();
    const { t } = useTranslation();
    

    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState(false);

    const themeMap = {
        "hi": "blue-mode",
        'zh': "green-mode",
        "fr": "yellow-mode",
        "en": "white-mode",
        "es": "white-mode",
        "pt": "white-mode",
    }

    const imageMap = {
        "hi": "/images/footer-bg.png",
        'zh': "https://t4.ftcdn.net/jpg/03/97/73/41/240_F_397734109_gD74kIi8J8TY1sQg26Pib42aoVseJ1Uq.jpg",
        "fr": "https://wallpapers.com/images/hd/pastel-yellow-background-7k2wsgatuo6m5eq4.jpg",
        "en": "https://w0.peakpx.com/wallpaper/991/957/HD-wallpaper-simple-red-gradient-abstract-background-kor4-rts-light.jpg",
        "es": "https://w0.peakpx.com/wallpaper/991/957/HD-wallpaper-simple-red-gradient-abstract-background-kor4-rts-light.jpg",
        "pt": "https://w0.peakpx.com/wallpaper/991/957/HD-wallpaper-simple-red-gradient-abstract-background-kor4-rts-light.jpg",
    }
    const [theme, setTheme] = useState(themeMap[lastLanguage]);


    const handleLogin = async (data) => {
        try {
            const userAgent = navigator.userAgent;
            if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
                setOtpType('emailLogin')
                try {
                    const response = await sendOtpEmailLogin(data.email);
                    localStorage.setItem('email', data.email)
                    setShowLogin(false);
                    setShowOTP(true);
                    console.log(response)

                } catch (err) {
                    toast.error("Login Failed")
                }

            } else if (userAgent.includes('Edg')) {
                const response = await loginUser(data);
                setUser(response.data)
                setShowLogin(false)
                toast.success("User Login successfully");

            }


        } catch (error) {
            setShowLogin(false)
            toast.error("Login failed.");

        }
    };
    const handleSendOtpEmail = async (email) => {
        if (!localStorage.getItem('token')) {
            toast.error("Kindly Login to change the Language.")
        }
        else {
            try {
                const response = await sendOtpEmail(email);

                toast.success("OTP sent to your email.");
                setOtpType("email")
                setShowOTP(true)
                console.log(response.data)


            } catch (error) {
                toast.error("Failed to send OTP.");

            }
        }

    };

    const handleVerifyOtpEmail = async (otp) => {
        try {
            await verifyOtpEmail(otp);

            setShowOTP(false)

            toast.success("OTP verified successfully.");
            return true

        } catch (error) {
            setShowOTP(false)
            toast.error("Invalid OTP. Please try again.");
            return false
        }
    };
    const handleVerifyOtpEmailLogin = async (otp) => {
        try {
            const email = localStorage.getItem('email')

            const res = await verifyOtpEmailLogin(email, otp);
            setShowOTP(false)
            setUser(res.name)
            localStorage.removeItem('email')
            toast.success("OTP verified successfully.");
            return true

        } catch (error) {
            setShowOTP(false)
            toast.error("Invalid OTP. Please try again.");
            return false
        }
    };

    const handleSendOtpPhone = async () => {
        if (!localStorage.getItem('token')) {
            toast.error("Kindly Login to change the Language.")
        }
        else {
            try {
                const response = await sendOtpPhone();

                toast.success("OTP sent to your phone.");
                setOtpType("phone")
                setShowOTP(true)
                console.log(response.data)


            } catch (error) {
                toast.error("Failed to send OTP.");

            }
        }
    };

    const handleVerifyOtpPhone = async (otp) => {
        try {
            await verifyOtpPhone(otp);
            setShowOTP(false)
            toast.success("OTP verified successfully.");
            return true
        } catch (error) {
            setShowOTP(false)
            toast.error("Invalid OTP. Please try again.");
            return false
        }
    };
    const handleSendOtpPhoneLogin = async (phone) => {

        try {
            console.log(phone)
            const response = await sendOtpPhoneLogin('+' + phone);
            setOtpType('phoneLogin')
            localStorage.setItem('phone', '+' + phone)
            toast.success("OTP sent to your phone.");
            // setOtpType("phone")
            setShowLoginPhone(false)
            setShowOTP(true)
            console.log(response.data)


        } catch (error) {
            toast.error("Failed to send OTP.");

        }
    }


    const handleVerifyOtpPhoneLogin = async (otp) => {
        try {
            const phone = localStorage.getItem('phone')
            const res = await verifyOtpPhoneLogin(phone, otp);
            localStorage.removeItem('phone')
            setUser(res.name)
            setShowOTP(false)
            toast.success("OTP verified successfully.");
            return true
        } catch (error) {
            setShowOTP(false)
            toast.error("Invalid OTP. Please try again.");
            return false
        }
    };
    const handleLoginHistory = async (otp) => {
        try {
            const response = await getLoginHistory(otp);
            setLoginHistory(response.data)
            toast.success("Login History fetched succesfully.");

        } catch (error) {
            setShowOTP(false)
            toast.error("Unable to fetch login history.");

        }
    };
    const handleUser = async () => {
        try {
            const response = await getUser();
            console.log(response.data)
            setUser(response.data)


        } catch (error) {
            setShowOTP(false)


        }
    };
    const handleUserData = async () => {
        try {
            const response = await getUserData();
            setUserData(response.data)


        } catch (error) {
            setShowOTP(false)


        }
    };





    useEffect(() => {
        const checkAccess = () => {
            const userAgent = navigator.userAgent;
            const isMobileDevice = /Mobi|Android/i.test(userAgent);
            const currentHour = new Date().getHours();

            // Check if the current time is between 10 AM and 1 PM
            const isWithinTimeRange = currentHour >= 10 && currentHour < 13;

            if (!isMobileDevice) {
                setAccessAllowed(true);
            } else if (isMobileDevice && isWithinTimeRange) {
                setAccessAllowed(true);
            } else {
                setAccessAllowed(false);
            }
        };

        checkAccess();

        // Optional: Set an interval to check periodically
        const intervalId = setInterval(checkAccess, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, []);

    return (
        <NavbarContext.Provider value={{notificationsEnabled,setNotificationsEnabled, showLogin, setShowLogin, user, setUser, handleSendOtpEmail, handleVerifyOtpEmail, showOTP, setShowOTP, handleSendOtpPhone, handleVerifyOtpPhone, otpType, selectedLanguage, setSelectedLanguage, t, theme, toast, setTheme, themeMap, handleLoginHistory, handleLogin, loginHistory, imageMap, handleUser, handleUserData, userData, handleVerifyOtpEmailLogin, accessAllowed, handleVerifyOtpPhoneLogin, handleSendOtpPhoneLogin, showLoginPhone, setShowLoginPhone }}>
            {children}
        </NavbarContext.Provider>
    );
}

export const useNavbar = () => useContext(NavbarContext);