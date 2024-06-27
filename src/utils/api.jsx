import axios from 'axios';

const API_BASE_URL = 'https://jobarena-backend.onrender.com/api';

const storeAuthInfo = (token, sessionId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('sessionId', sessionId);
};
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};
export const sendOtpEmail = () => {
    return axios.post(`${API_BASE_URL}/user/send-otp-email`, {}, getAuthHeader());
};
export const sendOtpEmailLogin = (email) => {
    return axios.post(`${API_BASE_URL}/user/send-otp-email-login`, { email });
};
export const sendOtpPhoneLogin = (phone) => {
    return axios.post(`${API_BASE_URL}/user/send-otp-phone-login`, { phone });
};

export const verifyOtpEmail = (otp) => {
    return axios.post(`${API_BASE_URL}/user/verify-otp-email`, { otp }, getAuthHeader());
};
export const verifyOtpEmailLogin = async (email, otp) => {
    const response = await axios.post(`${API_BASE_URL}/user/verify-otp-login`, { email, otp });
    console.log(response)
    const { token, sessionId } = response.data;
    storeAuthInfo(token, sessionId);
    return response.data;
};
export const verifyOtpPhoneLogin = async (phone, otp) => {
    const response = await axios.post(`${API_BASE_URL}/user/verify-otp-login-phone`, { phone, otp });
    console.log(response)
    const { token, sessionId } = response.data;
    storeAuthInfo(token, sessionId);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, data);
    const { token, sessionId } = response.data;
    storeAuthInfo(token, sessionId);
    return response.data;
};

export const signupUser = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, formData);
    const { token, sessionId } = response.data;
    storeAuthInfo(token, sessionId);
    return response.data;
};

export const sendOtpPhone = () => {
    return axios.post(`${API_BASE_URL}/user/send-otp-phone`, {}, getAuthHeader());
};

export const verifyOtpPhone = (otp) => {
    return axios.post(`${API_BASE_URL}/user/verify-otp-phone`, { otp }, getAuthHeader());
};


export const handleGoogleLogin = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/google/callback`);
        const { token, sessionId } = response.data;
        storeAuthInfo(token, sessionId);
        return response.data;
    } catch (error) {
        console.error("Google login error:", error);
        throw error;
    }
};

export const getLoginHistory = () => {
    return axios.get(`${API_BASE_URL}/user/login-history`, getAuthHeader());
};

export const getUser = () => {
    return axios.post(`${API_BASE_URL}/user/data`, {}, getAuthHeader());
};
export const getUserData = () => {
    return axios.post(`${API_BASE_URL}/user/userData`, {}, getAuthHeader());
};