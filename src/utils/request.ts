import axios from 'axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000
    // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = localStorage.getItem('token')
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        const res = JSON.parse(response.data)
        if (res.status_code !== 200) {
            return Promise.reject(new Error(res.description || 'Error'))
        }
        return res
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
