import ProductService from "@/application/services/product.service";
import PrismaProductRepository from "@/infra/repositories/prisma/prisma-product.repository";
import { prisma } from "@/infra/utils";
import ProductController from "@/presentations/controllers/product.controller";

export default function ProductFactory(): ProductController {
  const repository = new PrismaProductRepository(prisma);
  const service = new ProductService(repository);

  return new ProductController(service);
}
