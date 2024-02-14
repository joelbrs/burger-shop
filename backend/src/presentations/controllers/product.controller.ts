import ProductService from "@/application/services/product.service";
import { FastifyReply, FastifyRequest } from "fastify";
export default class ProductController {
  constructor(private readonly _service: ProductService) {}

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const products = await this._service.findAll(request);
    return reply.status(200).send(products);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const product = await this._service.findById(request);

    return reply.status(200).send(product);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const product = await this._service.create(request);
    return reply.status(201).send(product);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const product = await this._service.update(request);

    return reply.status(200).send(product);
  }
}
