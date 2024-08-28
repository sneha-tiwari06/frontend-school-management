import axios from 'axios';
console.log('Base URL:', process.env.REACT_APP_API_URL);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export default axiosInstance;
