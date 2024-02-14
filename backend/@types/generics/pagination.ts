export interface IPaginationResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface IPaginationRequest {
  page: number;
  size: number;
}
