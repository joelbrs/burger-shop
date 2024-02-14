import { setDataHandler, setErrorHandler } from '../utils/ResponseHandlers'
import type HttpClient from './HttpClient'

export default class HttpHandler {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly baseUrl?: string
  ) {}

  constructUrl(url?: string) {
    if (url) {
      return `${this.baseUrl}/${url}`
    }
    return this.baseUrl || ''
  }

  async post<T>(url: string, body: Object) {
    try {
      const data = await this._httpClient.post<T>(this.constructUrl(url), body)
      return setDataHandler<T>(data)
    } catch (err) {
      return setErrorHandler(err as Error)
    }
  }
}
