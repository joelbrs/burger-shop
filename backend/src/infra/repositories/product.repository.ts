import { Prisma, Product } from "@prisma/client";
import { IProductParams } from "../../../@types/products/select-product";
import { IPaginationResponse } from "../../../@types/generics/pagination";

export default interface ProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  findAll(params: IProductParams): Promise<IPaginationResponse<Product>>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
}
