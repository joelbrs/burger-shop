import type { CreateAxiosDefaults } from 'axios'
import { useRouter } from 'vue-router'
import axios from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
}

const $router = useRouter()
const $axios = axios.create(options)

$axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      $router.push({ name: 'login' })
    }
  }
)

export default $axios
