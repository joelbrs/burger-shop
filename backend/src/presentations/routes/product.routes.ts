import ProductFactory from "@/domain/factories/product.factory";
import { FastifyInstance } from "fastify";

const factory = ProductFactory();

export default async function ProductRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: [app.authUser] }, async (request, reply) => {
    return factory.findAll(request, reply);
  });

  app.get("/:id", { preHandler: [app.authUser] }, (request, reply) => {
    return factory.findById(request, reply);
  });

  app.post("/", { preHandler: [app.authAdmin] }, async (request, reply) => {
    return factory.create(request, reply);
  });

  app.put("/:id", { preHandler: [app.authAdmin] }, async (request, reply) => {
    return factory.update(request, reply);
  });
}
