import { setDataHandler, setErrorHandler } from '../utils/ResponseHandlers'
import type HttpClient from './HttpClient'

export default class HttpHandler {
  constructor(private readonly _httpClient: HttpClient) {}

  async post<T>(url: string, body: Object) {
    try {
      const data = await this._httpClient.post<T>(url, body)
      return setDataHandler<T>(data)
    } catch (err) {
      return setErrorHandler(err as Error)
    }
  }
}
