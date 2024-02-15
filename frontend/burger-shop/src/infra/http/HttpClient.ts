export default interface HttpClient {
  get<T>(url: string, params?: Object): Promise<T>
  post<T>(url: string, body: Object): Promise<T>
}
