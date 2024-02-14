import z from "zod";
import { ProductCategory } from "@prisma/client";
import { INITIAL_PAGE, PAGE_SIZE } from "@/infra/utils";
import ProductRepository from "@/infra/repositories/product.repository";
import { IProductParams } from "../../../@types/products/select-product";
import ICreateProductRequest from "../../../@types/products/create-product";
import { IUpdateProductRequest } from "../../../@types/products/update-product";
import { FastifyRequest } from "fastify";
import { IDetailParams } from "../../../@types/generics/request-params";

export default class ProductService {
  constructor(private readonly _repository: ProductRepository) {}

  async findAll(request: FastifyRequest) {
    const {
      page = INITIAL_PAGE,
      size = PAGE_SIZE,
      ...params
    } = request.query as IProductParams;

    return await this._repository.findAll({ ...params, page, size });
  }

  async findById(request: FastifyRequest) {
    const { id } = request.params as IDetailParams;

    return await this._repository.findById(id);
  }

  async create(request: FastifyRequest) {
    const body_schema = z.object({
      name: z.string(),
      price: z.number(),
      category: z.enum([
        ProductCategory.BURGER,
        ProductCategory.DESSERT,
        ProductCategory.DRINK,
        ProductCategory.ENTRANCE,
      ]),
    });

    const body = request.body as ICreateProductRequest;
    const valid_body = body_schema.parse(body);

    return await this._repository.create(valid_body);
  }

  async update(request: FastifyRequest) {
    const body_schema = z.object({
      name: z.string(),
      price: z.number(),
      category: z.enum([
        ProductCategory.BURGER,
        ProductCategory.DESSERT,
        ProductCategory.DRINK,
        ProductCategory.ENTRANCE,
      ]),
    });
    const { id } = request.params as IDetailParams;
    const body = request.body as IUpdateProductRequest;

    const valid_body = body_schema.parse(body);

    return await this._repository.update(id, valid_body);
  }
}
