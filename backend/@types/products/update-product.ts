import { ProductCategory } from "@prisma/client";

export interface IUpdateProductRequest {
  name: string;
  price: number;
  category: ProductCategory;
}
