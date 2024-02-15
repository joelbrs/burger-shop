import type { ProductDTOOut, RequestPagination } from '@/@types/product'
import { HttpFactory } from '@/factories/HttpFactory'

const base = '/products'
const httpClient = HttpFactory(base)

export function getProducts(params: Object) {
  return httpClient.get<RequestPagination<ProductDTOOut>>('', params)
}
