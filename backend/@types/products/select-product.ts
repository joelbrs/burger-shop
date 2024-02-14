import { ProductCategory } from "@prisma/client";
import { IPaginationRequest } from "../generics/pagination";

export interface IProductParams extends Partial<IPaginationRequest> {
  name?: string;
  category?: ProductCategory;
}
