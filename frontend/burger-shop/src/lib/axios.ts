import type { CreateAxiosDefaults } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
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
const { cookies } = useCookies()
const $axios = axios.create(options)

$axios.interceptors.request.use(
  (config) => {
    const token: string | null = cookies.get('access_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await $router.push({ name: 'login' })
    }
  }
)

export default $axios
