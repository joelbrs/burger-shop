import HttpHandler from '@/infra/http/HttpHandler'
import AxiosAdapter from '@/infra/http/adapters/AxiosAdapter'

export const HttpFactory = (): HttpHandler => {
  const adapter = new AxiosAdapter()
  return new HttpHandler(adapter)
}
