import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(Error(response.statusText));
    }
    return response.data;
  },
  (error) => Promise.reject(error),
);

export default service;
