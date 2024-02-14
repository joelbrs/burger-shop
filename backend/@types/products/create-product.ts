import { ProductCategory } from "@prisma/client";

export default interface ICreateProductRequest {
  name: string;
  price: number;
  category: ProductCategory;
}
