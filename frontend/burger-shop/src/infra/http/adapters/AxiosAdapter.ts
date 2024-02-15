import type { AxiosInstance } from 'axios'
import type HttpClient from '../HttpClient'
import $axios from '@/lib/axios'

export default class AxiosAdapter implements HttpClient {
  private _client: AxiosInstance = $axios

  async get<T>(url: string, params: Object) {
    const { data } = await this._client.get<T>(url, { params: params })
    return data
  }

  async post<T>(url: string, body: Object) {
    const { data } = await this._client.post<T>(url, body)
    return data
  }
}
