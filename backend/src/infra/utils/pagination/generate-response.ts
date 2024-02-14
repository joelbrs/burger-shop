import { INITIAL_PAGE, PAGE_SIZE } from "..";
import { IPaginationResponse } from "../../../../@types/generics/pagination";

interface IPaginationParams<T> {
  data: T;
  size?: number;
  page?: number;
  count: number;
}

export default function generatePaginatedResponse<T>(
  params: IPaginationParams<T[]>
): IPaginationResponse<T> {
  const { data, page, size, count } = params;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return {
    content: data,
    page: Number(page) ?? INITIAL_PAGE,
    size: Number(size) ?? PAGE_SIZE,
    totalElements: +count,
    totalPages,
  };
}
