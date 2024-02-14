import {
  $Enums,
  Prisma,
  PrismaClient,
  Product,
  ProductCategory,
} from "@prisma/client";
import ProductRepository from "../product.repository";
import { IProductParams } from "../../../../@types/products/select-product";
import getSkipParam from "@/infra/utils/pagination/get-skip-param";
import generatePaginatedResponse from "@/infra/utils/pagination/generate-response";
import { IPaginationResponse } from "../../../../@types/generics/pagination";

export default class PrismaProductRepository implements ProductRepository {
  constructor(private _client: PrismaClient) {}

  async findById(id: string) {
    return await this._client.product.findUnique({ where: { id } });
  }

  async findAll(params: IProductParams) {
    const { count, data } = await this.findPaginated(params);
    const { size, page } = params;

    return generatePaginatedResponse<Product>({ count, page, data, size });
  }

  async findByCategory(category: ProductCategory, params: IProductParams) {
    return await this.findAll({ ...params, category });
  }

  async create(data: Prisma.ProductCreateInput) {
    return await this._client.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return await this._client.product.update({ where: { id }, data });
  }

  async findPaginated(params: IProductParams) {
    const { page, size, category, name } = params;

    const [count, data] = await this._client.$transaction([
      this._client.product.count(),
      this._client.product.findMany({
        take: Number(size),
        where: { category, name },
        skip: getSkipParam({ page, size }),
      }),
    ]);

    return { count, data };
  }
}
