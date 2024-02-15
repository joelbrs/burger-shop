export interface RequestPagination<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
