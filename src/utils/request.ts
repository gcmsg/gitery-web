import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  headers: { Authorization: localStorage.getItem('token') },
  // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptors
service.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default service;
